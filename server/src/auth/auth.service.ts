import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import { DbService } from '../database/db.service';
import { hash } from 'bcrypt';
import { QueryResult } from "pg";
import { response } from "express";
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { IdCheckDto } from './dto/idCheck.dto';
import { SendCodeDto } from './dto/sendCode.dto';
import { VerifyCodeDto } from './dto/verifyCode.dto';
import { EmailCheckDto } from './dto/emailCheck.dto';
import { FindIdDto } from './dto/findIdPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DbService,
    private readonly configService: ConfigService, // 추가
  ) { }

  // 이메일 인증코드 저장소
  private emailCodes = new Map<string, string>();


  async register(dto: RegisterDto): Promise<any> {
    const hashedPassword: string = await hash(dto.password, 10);
    const query = `
      INSERT INTO users (name, user_id, birth, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      dto.name,
      dto.user_id,
      dto.birth,
      dto.email,
      hashedPassword,
    ];

    try {
      const result: QueryResult<any> = await this.db.query(query, values);
      console.log('가입성공', result.rows[0]);
      return result.rows[0];
    } catch (err) {
      response.status(500)
      console.error('가입실패', err);
      throw new InternalServerErrorException('서버 오류로 가입에 실패했습니다.');
    }

  }

  // 이메일 인증코드 전송
  async sendEmailCode(email: string): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    await transporter.sendMail({
      to: email,
      subject: '[주린이 공원] 이메일 인증코드',
      html: `<p>인증번호는 <b>${code}</b>입니다. 5분 이내에 입력해주세요.</p>`,
    });

    this.emailCodes.set(email, code);
    
    // 5분후 삭제임
    setTimeout(() => this.emailCodes.delete(email), 5 * 60 * 1000);
  }

  // 이메일 인증코드 검증
  verifyCode(email: string, code: string): boolean {
    const storedCode = this.emailCodes.get(email);
    return storedCode === code;
  }

  
  // 이메일로 user_id 찾기
  async findUserId(email: string): Promise<string | null> {
    const query = `
      SELECT user_id
      FROM users
      WHERE email = $1;
    `;

    try {
      const result = await this.db.query(query, [email]);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0].user_id;
    } catch (err) {
      console.error('아이디 찾기 실패:', err);
      throw new InternalServerErrorException('서버 오류로 아이디를 찾을 수 없습니다.');
    }
  }


  // 비밀번호 재설정
  async resetPassword(user_id: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      UPDATE users
      SET password = $1
      WHERE user_id = $2;
    `;

    try {
      await this.db.query(query, [hashedPassword, user_id]);
    } catch (err) {
      console.error('비밀번호 재설정 실패:', err);
      throw new InternalServerErrorException('서버 오류로 비밀번호를 변경할 수 없습니다.');
    }
  }
}

