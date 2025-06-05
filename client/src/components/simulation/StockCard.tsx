import { useGetStockBySymbolQuery } from "@/store/slices/stockApi";
import { stockList } from "../stocks/StockList";

type Props = {
  symbol: string;
  much?: number; // 보유일 때만 존재
};

export default function StockCard({ symbol, much }: Props) {

  const { data, error, isLoading } = useGetStockBySymbolQuery(symbol)

  // 에러, 로딩처리
  if (isLoading) return <p>{symbol} 로딩 중...</p>
  if (error) return <p>{symbol} 에러 발생</p>
  // 데이터 부족
  const values = data?.values
  if (!values || values.length < 2) return <p>{symbol} 데이터 부족</p>

  // 값 가져오기
  const current = Number(values[0].close)
  const prevClose = Number(values[1].close)
  const comparison = current - prevClose
  const change = (comparison / prevClose) * 100

  const name = stockList.find(stock => stock.symbol === symbol)?.name || symbol

  const total = much !== undefined ? current * much : current;
  const item = { name, current: total, comparison, change };


  return (
    <div>
      <div>
        <h4>{item.name}</h4>
        {much !== undefined && <p>{much}주</p>}
      </div>
      <div>
        <p>현재 : {item.current}풀</p>
        <p>{item.comparison.toFixed(5)}풀 ({item.change.toFixed(2)}%)</p>
      </div>
    </div>
  );
};