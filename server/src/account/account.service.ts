import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { AccountDto } from './dto/account.dto';
import { QueryResult } from 'pg';
import cookieParser from "cookie-parser";

@Injectable()
export class AccountService {
  constructor(private readonly db: DbService) {}
  async createAccount(
  //컨트롤러에서 req.user로 넘겼으니 한번만 받아야함 객체가 아니라 user만 받아와야함
    // 결국 AccountDto.user_id가 되어야 하기 때문
     user: AccountDto ,
    response: unknown,
  ): Promise<AccountDto> {
    try {
      //계좌번호 생성횟수
      let attempts = 0;
      //최대 생성 시도 횟수
      const maxAttempts = 5;
      //계좌번호 초기화
      let accountNumber = '';
//계좌번호 생성을 5번까지 했는데 계속 중복일 경우 -> 에러반환
      while (attempts < maxAttempts) {
        // 8자리 랜덤 숫자 생성
        const raw = Math.floor(100000000 + Math.random() * 900000000).toString();
        accountNumber = `1111-${raw.slice(0, 3)}-${raw.slice(3)}`;

        // 같은 계좌가 있는지 중복확인
        const check = await this.db.query(
          'SELECT account_number FROM account WHERE account_number = $1 AND user_id = $2',
          [accountNumber, user.user_id],
        );
        // 검색결과가 없으면(중복이 아니면) 계좌 생성
        if (check.rowCount === 0) {
          // 초기자산 설정
          const asset = 10000000
          const insert = await this.db.query(
            'INSERT INTO account (user_id, account_number, asset) VALUES ($1, $2, $3) RETURNING *',
            [user.user_id, accountNumber, asset],
          );
          return insert.rows[0];
        }
        // 중복일시 1 증가, 총 5번 시도 가능
        attempts++;
      }
      throw new InternalServerErrorException('계좌생성 시도 횟수 초과');
    } catch (err) {
      console.error('계좌 생성 중 오류:', err);
      throw new InternalServerErrorException(
        '계좌 생성 중 오류가 발생했습니다 ',
      );
    }
  }
}
