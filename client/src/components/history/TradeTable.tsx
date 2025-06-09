// 거래내역 리스트
//타입
import { TradeItem } from "@/types/tradeItem"
import { iconMap } from "../stocks/StockIconMaps"

export default function TradeTable({trades}:{trades:TradeItem[]}){
  return (
    <div className="divide-y text-sm">
      {trades.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between w-full px-4 py-3 border-b last:border-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xl">
              {iconMap[item.symbol] ? iconMap[item.symbol]() : item.symbol[0]}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">{item.symbol}</h4>
              <p className="text-xs text-gray-500">{item.much.toLocaleString()}주</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">
              {(item.price * item.much).toLocaleString()}풀
            </p>
            <p
              className={`text-xs font-medium ${
                item.buy_sell ? 'text-red-500' : 'text-blue-600'
              }`}
            >
              {item.buy_sell ? '+' : '-'}
              {item.price.toLocaleString()}
            </p>
            <p className="text-xs text-black">
              {item.date.split("T")[0]}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}