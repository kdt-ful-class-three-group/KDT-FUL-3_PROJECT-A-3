// 거래내역 리스트
//타입
import { TradeItem } from "@/types/tradeItem"

export default function TradeTable({trades}:{trades:TradeItem[]}){
  return (
    <div className="divide-y text-sm">
      {trades.map((item) => (
        <div key={item.id} className="py-3 px-2">
          <div className="flex justify-between items-center font-medium">
            <div className="text-gray-800">{item.symbol}</div>
            <div className={item.buy_sell ? "text-blue-600" : "text-red-600"}>
              {item.buy_sell ? "+" : "-"}
              {(item.price * item.much).toLocaleString()} 풀
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1 flex justify-between">
            <div>{item.date.split("T")[0]}</div>
            <div className="text-gray-400">
              {item.buy_sell ? "구매" : "판매"} | {item.much}주 · {item.price.toLocaleString()}풀
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}