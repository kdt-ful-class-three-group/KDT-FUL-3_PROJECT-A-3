import { StockInfoProps } from "@/types/stock";
import { getKoreanSymbol } from "./StockList";

export function StockInfo({ symbol, price }: StockInfoProps) {

  const koSymbol = getKoreanSymbol(symbol);

  return (
    <div>
      <h1>{koSymbol} ({symbol})</h1>
      <p>현재가: {price ?? "정보 없음"}</p>
    </div>
  );
}