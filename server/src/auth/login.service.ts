import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { QueryResult } from "pg";
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService
  ) {}


    async login(dto: LoginDto): Promise<any>{
    const query = `
      SELECT user_id, password, name, guide_check FROM users WHERE user_id = $1;
    `;
    const values = [dto.user_id];

      console.log("유저아이디 정보", values)


    try{
      console.log("트라이 진입")
    
    const result: QueryResult<any> = await this.db.query(query, values);

    console.log("쿼리문 시행 정보", result.rows[0]);

    //유저가 없을 때
    if(!result.rows[0]){
      throw new UnauthorizedException('해당 유저가 없습니다')
    }
    
    //비밀번호 매치
    const isMatch = await compare(dto.password, result.rows[0].password);

    //틀렸을 때
    if(!isMatch) {
      console.log('로그인 실패', '비밀번호가 틀렸습니다.');
      throw new UnauthorizedException('비밀번호가 틀렸습니다')
    } 
    //성공
    else {
      const payload = { user_id: result.rows[0].user_id, name: result.rows[0].name, guide_check: result.rows[0].guide_check };
      console.log('페이로드 정보:',payload);
      console.log('JWT 시크릿 값 확인:', process.env.JWT_TOKEN_SECRET); // 👈 이 줄 추가
      const accessToken = this.jwtService.sign(payload);

      console.log('로그인 성공', result.rows[0].user_id);
        return {
            accessToken,
            user_id: result.rows[0].user_id,
            message: '로그인 성공',
        };
    }

  } catch(err){
        console.error('로그인 실패','해당 유저가 존재하지 않습니다.', err);
        if(err instanceof UnauthorizedException) throw err;
        throw new InternalServerErrorException('서버 오류로 로그인에 실패했습니다.');
    }
  }
}