import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class StocksService {
 private readonly API_KEY = process.env.STOCK_API_KEY

 async getStocksData(symbol: string) : Promise<any> {
   const url = 'https://api.twelvedata.com/time_series';
   const params={
     apikey: this.API_KEY,
     interval:'15min',
     format: 'JSON',
     symbol: symbol.toUpperCase()
   };

   try{
     const res = await axios.get(url, { params });
     return res.data;
   } catch(err){
     console.error('주식데이터 불러오기 실패:', err);
        throw new Error('주식데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
   }



 }

}