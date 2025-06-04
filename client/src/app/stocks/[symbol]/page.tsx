'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import StockChart from "@/components/stocks/StockChart"
import { Button } from "@/components/common/Button"
import { StockInfo } from "@/components/stocks/StockInfo"
import { StockData, StockValue } from "@/types/stock"
import { StockTradeButton } from "@/components/stocks/StockTradeButton"

import axios from "axios"

export default function StockPage() {
    const params = useParams(); // URL에서 종목(symbol) 파라미터 가져오기
    const symbol = (params?.symbol ?? '') as string; // 심볼 문자열 추출 (없으면 빈 문자열)
    const [stockData, setStockData] = useState<StockData | null>(null); // 주식 데이터 상태 저장
    const [lastDatetime, setLastDatetime] = useState<string | null>(null); // 마지막 데이터 시각 저장
    const router = useRouter(); // (현재 사용 안 함) 페이지 이동용 훅

    useEffect(() => {
        // 페이지 최초 로드시 주식 데이터 불러오기
        axios.get<StockData>(`http://localhost:8008/stocks/${symbol}`)
            .then(res => {
                setStockData(res.data); // 응답 데이터를 상태로 설정
                setLastDatetime(res.data.values.at(-1)?.datetime ?? null); // 마지막 캔들 시각 저장
            })
            .catch(console.error); // 에러 발생 시 콘솔 출력
    }, [symbol]); // symbol이 변경될 때마다 재요청

    useEffect(() => {
        if (!lastDatetime) return; // lastDatetime이 없으면 실행 중단

        const interval = setInterval(() => {
            const now = new Date().toISOString(); // 현재 시각 (toKST 용)

            // 마지막 시간부터 현재까지의 새 데이터 요청
            axios.get<StockData>(`http://localhost:8008/stocks/${symbol}?fromKST=${lastDatetime}&toKST=${now}`)
                .then(res => {
                    if (res.data.values.length > 0) {
                        // 기존 데이터에 새 데이터 누적 추가
                        setStockData(prev => {
                            if (!prev) return res.data;
                            return {
                                ...prev,
                                values: [...prev.values, ...res.data.values]
                            };
                        });
                        // 마지막 시간 갱신
                        setLastDatetime(res.data.values.at(-1)?.datetime ?? lastDatetime);
                    }
                })
                .catch(console.error); // 에러 로그
        }, 30000); // 30초마다 새 데이터 요청 (실제로는 5분에 맞춰 조정 가능)

        return () => clearInterval(interval); // 언마운트 시 인터벌 해제
    }, [lastDatetime, symbol]); // 의존성: 심볼 or 마지막 시간 변경 시 재설정

    // 데이터 없을 경우 로딩 문구 표시
    if (!stockData || stockData.values.length === 0) return <div>주식불러오는중...</div>;

    const latest = stockData.values.slice(-1)[0]; // 마지막 데이터 추출 (최근 종가 등)

    return (
        <div>
            <StockInfo
                symbol={stockData.symbol} // 종목명
                price={latest?.close} // 종가
            />

            <StockChart data={stockData.values} symbol={stockData.symbol} /> {/* 캔들 차트 */}

            <StockTradeButton symbol={stockData.symbol} price={Number(latest?.close)} /> {/* 매매 버튼 */}
        </div>
    );
}