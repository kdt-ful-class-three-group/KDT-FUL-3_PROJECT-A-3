import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { AccountDto } from './dto/account.dto';
import { QueryResult } from 'pg';

@Injectable()
export class AccountService {
  constructor(private readonly db: DbService) {}


    async account(dto: AccountDto): Promise<any>{
    const query = `
      INSERT INTO account (user_id, account_number, asset)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [dto.user_id, dto.account_number, dto.asset];

      console.log("계좌 정보", values)


    try{
    console.log("트라이 진입")
    
    const result: QueryResult<any> = await this.db.query(query, values);

    console.log("쿼리문 시행 정보", result.rows[0]);

    const nameResult = await this.db.query(`SELECT name FROM users WHERE user_id = $1`,[result.rows[0].user_id]);

    console.log(nameResult.rows[0].name, '님 계좌개설 성공')
    return result.rows[0];

  } catch(err){
        console.error('계좌개설 실패', err);
        throw new InternalServerErrorException('서버 오류로 로그인에 실패했습니다.');
    }
  }
}