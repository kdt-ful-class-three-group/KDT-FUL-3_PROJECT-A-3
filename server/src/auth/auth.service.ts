import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { RegisterDto } from './dto/register.dto';
import { hash } from 'bcrypt';
import { QueryResult } from 'pg';
import { response } from 'express';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly db: DbService, ) {}

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
      const user = result.rows[0];
      console.log('가입성공', result.rows[0]);

    return user
    } catch (err) {
      response.status(500);
      console.error('가입실패', err);
      throw new InternalServerErrorException(
        '서버 오류로 가입에 실패했습니다.',
      );
    }
  }
}
