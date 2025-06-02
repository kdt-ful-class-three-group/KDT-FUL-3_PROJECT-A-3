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

        const today = new Date();
        const day = today.getDate();
        const date = '2025-05-01';
        const from = `${date} 00:00:00`; // 23:30:00 is the start of the trading day in UTC
        const to   = `${date} 04:30:00`;
        const from2 = `${date} 22:30:00`// 06:30:00 is the end of the trading day in UTC
        const to2 = `${date} 23:59:59`// 06:30:00 is the end of the trading day in UTC



        const query = `
            SELECT * FROM stocks
            WHERE symbol = $1 AND (
                (datetime BETWEEN $2 AND $3) OR
                (datetime BETWEEN $4 AND $5)
                )
            ORDER BY datetime ASC;
        `;
        const rows = await this.db.query(query, [
            symbol.toUpperCase(), from, to, from2, to2
        ]);

        return {
            symbol,
            close: rows.rows.at(-1)?.close ?? null,
            values: rows.rows,
        };
    }
}