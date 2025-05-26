import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { QueryResult } from "pg";
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private readonly db: DbService) {}


    async login(dto: LoginDto): Promise<any>{
    const query = `
      SELECT user_id, password FROM users WHERE user_id = $1;
    `;
    const values = [dto.user_id];

      console.log("유저아이디 정보", values)


    try{
      console.log("트라이 진입")
    
    const result: QueryResult<any> = await this.db.query(query, values);

    console.log("쿼리문 시행 정보", result.rows[0].password);

    const isMatch = await compare(dto.password, result.rows[0].password);

    if(!isMatch) {
      console.log('로그인 실패', '비밀번호가 틀렸습니다.');
      return null;
    } else {
      console.log('로그인 성공', result.rows[0].user_id);
    }

  } catch(err){
        console.error('로그인 실패','해당 유저가 존재하지 않습니다.', err);
        
    }
  }
}