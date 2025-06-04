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
    // 데이터베이스 작업을 위한 DbService 주입자
    constructor(private readonly db :DbService ) {}

    // 환경 변수에서 API 키를 불러옵니다
    private readonly API_KEY = process.env.STOCK_API_KEY;

    // 주식 데이터를 가져오는 메인 메서드, KST 기준으로 날짜 범위 선택적 필터링 가능
    async getStockData(symbol: string, fromKST?:string, toKST?:string): Promise<{symbol: string, close: number | null, values: StockRow[], message?: string}> {
        // 심볼이 대문자, 숫자, 밑줄만 포함하는지 검증
        if (!/^[A-Z0-9_]+$/.test(symbol)) {
            throw new Error('Invalid symbol');
        }

        let queryFromKST: string;
        let queryToKST: string;

        // fromKST와 toKST가 모두 제공되면 해당 범위로 쿼리 수행
        if (fromKST && toKST) {
            // 제공된 날짜 범위를 할당
            queryFromKST = fromKST;
            queryToKST = toKST;

            // 디버깅을 위한 갱신 쿼리 범위 로그 출력
            console.log(`갱신쿼리, ${symbol} : ${queryFromKST} ~ ${queryToKST}`);

            // 주어진 범위 내 주식 데이터를 선택하는 SQL 쿼리 준비
            const query = `
                SELECT *
                FROM stocks
                WHERE symbol = $1
                  AND datetime BETWEEN $2 AND $3
                ORDER BY datetime ASC
            `;

            // 파라미터로 심볼 대문자, fromKST, toKST를 사용하여 쿼리 실행
            const result = await this.db.query<StockRow>(query, [symbol.toUpperCase(), queryFromKST, queryToKST]);

            // 결과가 없으면 로그 출력 후 빈 데이터와 메시지 반환
            if (result.rows.length === 0) {
                console.log(`[StocksService] 갱신 쿼리: ${symbol} - 새로운 데이터 없음.`);
                return {symbol, close: null, values: [], message: `No new data found for custom range.`};
            }

            // 쿼리 결과 행 수 로그 출력
            console.log(`[StocksService] 갱신 쿼리: ${symbol} - ${result.rows.length}개 데이터 반환.`);

            // 심볼, 마지막 종가, 그리고 모든 행 반환
            return {
                symbol,
                close: result.rows.at(-1)?.close ?? null,
                values: result.rows,
            };
        } else {
            // 날짜 범위가 없으면 최근 한 달치 초기 데이터 로드 시도

            // 현재 날짜 가져오기
            const today = new Date();

            // targetDate를 오늘로부터 한 달 전으로 초기화
            let targetDate = new Date(today);
            targetDate.setMonth(targetDate.getMonth() - 1); // 한 달 전으로 시작
            targetDate.setHours(0, 0, 0, 0); // 날짜의 시간을 00:00:00으로 초기화

            // 데이터 행과 시도 횟수 초기화
            let rows: { rows: StockRow[] } = {rows: []};
            let attempts = 0;

            // 무한 루프 방지를 위한 최대 시도 횟수 설정 (최대 10일 전까지 탐색)
            const MAX_ATTEMPTS = 10; // 무한 루프 방지를 위한 최대 시도 횟수

            // 초기 로드 쿼리 시작 로그 출력
            console.log(`[StocksService] 초기 로드 쿼리: ${symbol}. 최대 ${MAX_ATTEMPTS}일 전까지 탐색.`);

            // 데이터가 발견되거나 최대 시도 횟수에 도달할 때까지 반복
            while (rows.rows.length === 0 && attempts < MAX_ATTEMPTS) {
                // targetDate를 YYYY-MM-DD 형식으로 포맷팅
                const year = targetDate.getFullYear();
                const month = String(targetDate.getMonth() + 1).padStart(2, '0');
                const day = String(targetDate.getDate()).padStart(2, '0');
                const dateString = `${year}-${month}-${day}`;

                // 쿼리 범위 끝을 위해 다음 날 날짜 계산
                const nextDay = new Date(targetDate);
                nextDay.setDate(targetDate.getDate() + 1); // 다음 날로 설정 (날짜만 변경)

                // 다음 날도 YYYY-MM-DD 형식으로 포맷팅
                const nextDayYear = nextDay.getFullYear();
                const nextDayMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
                const nextDayDay = String(nextDay.getDate()).padStart(2, '0');

                // 쿼리 범위 정의: targetDate 22:30 KST 부터 nextDay 05:00 KST 까지
                queryFromKST = `${dateString} 22:30:00+09`;
                queryToKST = `${nextDayYear}-${nextDayMonth}-${nextDayDay} 05:00:00+09`;

                // 해당 범위 내 주식 데이터를 선택하는 SQL 쿼리 준비
                const query = `
                    SELECT *
                    FROM stocks
                    WHERE symbol = $1
                      AND datetime BETWEEN $2 AND $3
                    ORDER BY datetime ASC
                `;

                // 심볼과 날짜 범위 파라미터로 쿼리 실행
                const result = await this.db.query<StockRow>(query, [symbol.toUpperCase(), queryFromKST, queryToKST]);
                rows.rows = result.rows;

                // 시도 번호, 날짜 범위, 발견된 데이터 수 로그 출력
                console.log(`Attempt ${attempts + 1}: KST 날짜 ${dateString} (${queryFromKST} to ${queryToKST}). 발견된 데이터 수: ${rows.rows.length}`);

                // 데이터가 없으면 targetDate를 하루 전으로 변경하고 시간 초기화
                if (rows.rows.length === 0) {
                    targetDate.setDate(targetDate.getDate() - 1); // 날짜를 전날로 변경
                    targetDate.setHours(0, 0, 0, 0); // 시간 다시 00:00:00으로 초기화
                }
                // 시도 횟수 증가
                attempts++;
            }

            // 모든 시도 후에도 데이터가 없으면 경고 로그 출력 및 빈 데이터와 메시지 반환
            if (rows.rows.length === 0) {
                console.warn(`[StocksService] 초기 로드: ${symbol}에 대한 데이터를 지난 ${MAX_ATTEMPTS}일 동안 찾을 수 없습니다.`);
                return {
                    symbol,
                    close: null,
                    values: [],
                    message: `No initial data found for ${symbol}.`,
                };
            }

            // 데이터가 발견되면 행 수 로그 출력 후 마지막 종가와 함께 반환
            console.log(`[StocksService] 초기 로드: ${symbol} - ${rows.rows.length}개 데이터 반환.`);
            return {
                symbol,
                close: rows.rows.at(-1)?.close ?? null,
                values: rows.rows,
            };
        }

    }
}