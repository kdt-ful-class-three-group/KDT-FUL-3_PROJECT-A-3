import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { UserPortfolioDto } from './dto/userportfolio.dto';

@Injectable()
export class HistoryPortfolio {
  constructor(private readonly db: DbService) {}

  async history(req: UserPortfolioDto) {
    const query = `
      SELECT * FROM user_portfolio WHERE user_id = $1
    `;

    const values = [req.user_id];
    const result = await this.db.query(query, values);

    // 리턴 형식: [{ symbol: 'AAPL', much: 2 }, ...]
    return result.rows;
  }
}