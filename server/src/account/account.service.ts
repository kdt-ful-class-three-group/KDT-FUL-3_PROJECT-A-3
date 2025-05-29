import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { AccountDto } from './dto/account.dto';
import { QueryResult } from 'pg';
import cookieParser from "cookie-parser";

@Injectable()
export class AccountService {
  constructor(private readonly db: DbService) {}
  async createAccount(req, res: Promise<any> {


    let accountNumber = '';
    while(true){
      const raw = Math.floor(10000000 + Math.random() * 90000000).toString();
      accountNumber = `1111-${raw.slice(0, 3)}-${raw.slice(3)}`;

      const check = await this.db.query(`SELECT account_number FROM account WHERE account_number = $1 AND user_id = $2`, [accountNumber, req.user.user_id]);
    if(check.rowCount === 0 ){
      break;

    }
    }
    const insert= await this.db.query(`INSERT INTO account (user_id, account_number, asset) VALUES ($1, $2, $3) RETURNING *;`,[req.user.user_id,accountNumber,req.user.asset])
    return insert.rows[0];





  }

}