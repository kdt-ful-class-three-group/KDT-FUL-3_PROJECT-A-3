import { Injectable } from '@nestjs/common';
import axios from "axios";
import {DbService} from "../database/db.service";

@Injectable()
export class StocksService {
    constructor(private readonly db :DbService ) {}
 private readonly API_KEY = process.env.STOCK_API_KEY

 // async getStocksData(symbol: string) : Promise<any> {
 //   const url = 'https://api.twelvedata.com/time_series';
 //   const params={
 //     apikey: this.API_KEY,
 //     interval: '1day',
 //     outputsize: 7,
 //     format: 'JSON',
 //     symbol: symbol.toUpperCase()
 //   };
 //
 //   try{
 //     const res = await axios.get(url, { params });
 //     return res.data;
 //   } catch(err){
 //     console.error('주식데이터 불러오기 실패:', err);
 //        throw new Error('주식데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
 //   }
 //
 //
 //
 // }
    async getStockData(symbol: string) {
        if (!/^[A-Z0-9_]+$/.test(symbol)) {
            throw new Error('Invalid symbol');
        }

        const query = `SELECT * FROM stocks where symbol = $1 ORDER BY datetime DESC LIMIT 300`;
        const rows  = await this.db.query(query, [symbol.toUpperCase()]);
        return {
            symbol,
            close: rows.rows[0]?.close ?? null,
            values: rows.rows,
        }
    }
}