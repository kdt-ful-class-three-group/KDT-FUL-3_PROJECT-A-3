import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { TradeDto } from './dto/trade.dto';
import { QueryResult } from 'pg';


@Injectable()
export class TradeResultService {
  constructor(private readonly db: DbService) {}


    async tradeResult(
      user:TradeDto,
      req:TradeDto
    ) {
    const asset:QueryResult = await this.db.query(`
      SELECT asset FROM account WHERE user_id = $1
      `, [req.user_id]);
      
    if(user.type === 'buy') {
    const assetResult = Number(asset.rows[0].asset) - Number(user.price)
    const value = [assetResult, req.user_id]

    const result = await this.db.query(`
      UPDATE account SET asset = $1 WHERE user_id = $2
      `, value);
      return result.rows[0];
    } else if (user.type === 'sell') {
    const assetResult = Number(asset.rows[0].asset) + Number(user.price)
    const value = [assetResult, req.user_id]

    const result = await this.db.query(`
      UPDATE account SET asset = $1 WHERE user_id = $2
      `, value);
      console.log('업데이트 완료');
      return result.rows[0];
    }
  }

}