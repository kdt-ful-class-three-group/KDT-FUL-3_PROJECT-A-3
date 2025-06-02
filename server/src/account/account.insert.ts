import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { AccountDto } from './dto/account.dto';
import { QueryResult } from 'pg';
import cookieParser from "cookie-parser";

@Injectable()
export class InsertService {
  constructor(private readonly db: DbService) {}
  async insertAccount(dto:AccountDto, req:AccountDto) {
    console.log(req.user_id, dto.account_number, dto.asset)
    try {
          // 초기자산 설정
          const insert = await this.db.query(
            'INSERT INTO account (user_id, account_number, asset) VALUES ($1, $2, $3) RETURNING *',
            [req.user_id, dto.account_number, dto.asset],
          );
          return insert.rows[0];
      }
     catch (err) {
      console.error('계좌 생성 중 오류:', err);
      throw new InternalServerErrorException(
        '계좌 생성 중 오류가 발생했습니다 ',
      );
    }
  }
}

