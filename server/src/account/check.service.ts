import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { QueryResult } from 'pg';
import { AccountDto } from './dto/account.dto';


@Injectable()
export class CheckService {
  constructor(private readonly db: DbService) {}


    async check(req:AccountDto): Promise<any>{


    const query = `
      SELECT * FROM account WHERE user_id = $1
    `;
    const values = [req.user_id];

      console.log("계좌 정보", values)


    try{
    console.log("트라이 진입")
    
    const result: QueryResult<any> = await this.db.query(query, values);

    console.log("쿼리문 시행 정보", result.rows[0]);

    const nameResult = await this.db.query(`SELECT name FROM users WHERE user_id = $1`,[result.rows[0].user_id]);

    console.log(nameResult.rows[0].name, '계좌 조회 완료')
    return result.rows[0];

  } catch(err){
        console.error('계좌조회 실패', err);
        throw new InternalServerErrorException('서버 오류로 로그인에 실패했습니다.');
    }
  }
}