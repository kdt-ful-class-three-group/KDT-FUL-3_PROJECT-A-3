import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { QueryResult } from 'pg';
import { UserPortfolioDto } from './dto/userportfolio.dto';


@Injectable()
export class TradeService {
  constructor(private readonly db: DbService) {}


    async trade(
      user:UserPortfolioDto,
      req:UserPortfolioDto
    ) {
    const account_number:QueryResult = await this.db.query(`
      SELECT account_number FROM account WHERE user_id = $1
      `, [req.user_id]);
      
      const query = `
        INSERT INTO user_portfolio (account_number, user_id, symbol, price, much, buy_sell) VALUES ($1, $2, $3, $4, $5, $6)
        `

      console.log('쿼리문 작성까지는 됨.');
    if(user.type === 'buy') {

    const value = [account_number.rows[0].account_number, req.user_id, user.symbol, user.price, user.much, true];

    const result = await this.db.query(query, value);
      console.log('타입이 구매일때:',result.rows[0]);
      return result.rows[0];

    } else if (user.type === 'sell') {

    const value = [account_number.rows[0].account_number, req.user_id, user.symbol, user.price, user.much, true];

    const result = await this.db.query(query, value);
      console.log('타입이 판매일때:',result.rows[0]);
      return result.rows[0];
    }
  }

}