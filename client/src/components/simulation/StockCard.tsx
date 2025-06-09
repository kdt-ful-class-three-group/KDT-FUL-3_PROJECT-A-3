
import { useGetStockBySymbolQuery } from "@/store/slices/stockApi";
import { stockList } from "../stocks/StockList";
import { iconMap } from "../stocks/StockIconMaps";

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
    <div className="flex items-center justify-between w-full px-4 py-3 border-b last:border-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xl">
          {iconMap[symbol] ? iconMap[symbol]() : item.name[0]}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
          {much !== undefined && (
            <p className="text-xs text-gray-500">{much.toLocaleString()}주</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-800">
          {item.current.toLocaleString()}풀
        </p>
        <p
          className={`text-xs font-medium ${
            item.comparison >= 0 ? 'text-red-500' : 'text-blue-600'
          }`}
        >
          {item.comparison >= 0 ? '+' : ''}
          {item.comparison.toLocaleString()}풀 ({item.change.toFixed(1)}%)
        </p>
      </div>
    </div>
  )
};