import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { QueryResult } from "pg";
import { IdCheckDto } from './dto/idCheck.dto';

@Injectable()
export class IdCheckService {
  constructor(private readonly db: DbService) {}


    async idCheck(dto: IdCheckDto): Promise<any>{
    const query = `
      SELECT user_id FROM users WHERE user_id = $1;
    `;
    const values = [dto.user_id];



    try{
      console.log("트라이 진입")
    
    const result: QueryResult<any> = await this.db.query(query, values);
    console.log("쿼리문 시행 정보", result.rows);
    if(result.rows.length > 0) {
      // 유저가 있을 때
      console.log('유저가 존재합니다.');
      throw new BadRequestException('이미 존재하는 아이디 입니다.');
      

    } else {
      console.log('사용가능한 아이디 입니다.');
      return {
        message: '사용가능한 아이디 입니다.',
      };
    }

    //유저가 없을 때
    
  } catch(err){
        console.error('서버 오류', err);
        if(err instanceof BadRequestException) throw err;
        throw new InternalServerErrorException('서버 오류로 통신에 실패했습니다.');
    }
  }
}