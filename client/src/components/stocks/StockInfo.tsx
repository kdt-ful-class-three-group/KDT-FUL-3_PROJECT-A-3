import { StockInfoProps } from "@/types/stock";

export function StockInfo({ symbol, price }: StockInfoProps) {
  return (
    <div>
      <h1>{symbol}</h1>
      <p>현재가: {price ?? "정보 없음"}</p>
    </div>
  );
}