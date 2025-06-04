import { Injectable } from '@nestjs/common';
import axios from "axios";
import { DbService } from "../database/db.service";

export interface StockRow {
    symbol: string;
    datetime: string;
    open: number;          // 시가
    high: number;          // 고가
    low: number;           // 저가
    close: number;         // 종가
    volume: number;        // 거래량
}

@Injectable()
export class StocksService {
    constructor(private readonly db :DbService ) {}
    private readonly API_KEY = process.env.STOCK_API_KEY;

    async getStockData(symbol: string) {
        if (!/^[A-Z0-9_]+$/.test(symbol)) {
            throw new Error('Invalid symbol');
        }

        const today = new Date();
        let targetDate = new Date(today);
        targetDate.setMonth(targetDate.getMonth() - 1); // 한 달 전으로 시작

        targetDate.setHours(0, 0, 0, 0);

        // 타입초기화
        let rows: { rows: StockRow[] } = { rows: [] };
        let attempts = 0;
        const MAX_ATTEMPTS = 10;

        while (rows.rows.length === 0 && attempts < MAX_ATTEMPTS) {
            const year = targetDate.getFullYear();
            const month = String(targetDate.getMonth() + 1).padStart(2, '0');
            const day = String(targetDate.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;


            const nextDay = new Date(targetDate);
            nextDay.setDate(targetDate.getDate() + 1);

            const nextDayYear = nextDay.getFullYear();
            const nextDayMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
            const nextDayDay = String(nextDay.getDate()).padStart(2, '0');
            const fromKST = `${dateString} 22:30:00+09`;
            const toKST = `${nextDayYear}-${nextDayMonth}-${nextDayDay} 05:00:00+09`; // KST 다음 날 05:00:00 (오프셋은 DB에 따라 제거될 수 있음)


            const query = `
                SELECT * FROM stocks
                WHERE symbol = $1 AND datetime BETWEEN $2 AND $3
                ORDER BY datetime ASC
            `;


            // 명시적인 타입 단언이 필요:
            const result = await this.db.query<StockRow>(query, [symbol.toUpperCase(), fromKST, toKST]);
            rows.rows = result.rows; // 타입이 지정된 행을 할당

            console.log(`Attempt ${attempts + 1}: Querying for date ${dateString} (${fromKST} to ${toKST})`);
            console.log("rows 개수:", rows.rows.length);

            if (rows.rows.length === 0) {
                targetDate.setDate(targetDate.getDate() - 1);
            }
            attempts++;
        }

        if (rows.rows.length === 0) {
            console.warn(`No stock data found for ${symbol} within the last ${MAX_ATTEMPTS} days.`);
            return {
                symbol,
                close: null,
                values: [],
                message: `No data found for ${symbol} on or before the target date.`,
            };
        }

        // 이제 TypeScript는 rows.rows 내의 요소들이 StockRow 타입임을 알고 있으므로
        // 'close' 속성이 존재
        return {
            symbol,
            close: rows.rows.at(-1)?.close ?? null,
            values: rows.rows,
        };
    }
}