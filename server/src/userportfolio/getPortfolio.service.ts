import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { UserPortfolioDto } from './dto/userportfolio.dto';

@Injectable()
export class GetPortfolio {
  constructor(private readonly db: DbService) {}

  async calc(req: UserPortfolioDto) {
    const query = `
      SELECT symbol,
        SUM(CASE 
          WHEN buy_sell = true THEN much 
          WHEN buy_sell = false THEN -much 
          ELSE 0 
        END) AS much
      FROM user_portfolio
      WHERE user_id = $1
      GROUP BY symbol
      HAVING SUM(CASE 
          WHEN buy_sell = true THEN much 
          WHEN buy_sell = false THEN -much 
          ELSE 0 
        END) > 0
    `;

    const values = [req.user_id];
    const result = await this.db.query(query, values);

    // 리턴 형식: [{ symbol: 'AAPL', much: 2 }, ...]
    return result.rows;
  }
}