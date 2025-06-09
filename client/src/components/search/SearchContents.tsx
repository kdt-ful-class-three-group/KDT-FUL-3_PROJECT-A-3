import { Button } from "../common/Button"
import { stockList } from "../stocks/StockList"
import { useRouter } from "next/navigation"

export function SearchContents() {
  const router = useRouter()

  const handleStockClick = (stockName: string) => {
    // 종목 찾는 로직
    const matchedStock = stockList.find((stock) => stock.name === stockName)
    if (matchedStock) {
      router.push(`/stocks/${matchedStock.symbol}`)
    } else {
      alert('종목을 찾을 수 없습니다.')
    }
  }


  return (
    <div className="p-4">
      <p className="text-lg font-semibold text-gray-800 mb-4">추천 검색어</p>
      <div className="flex flex-wrap gap-2">
        <Button
          name="애플"
          onClick={() => handleStockClick("애플")}
          className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        />
        <Button
          name="구글"
          onClick={() => handleStockClick("구글")}
          className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        />
        <Button
          name="엔비디아"
          onClick={() => handleStockClick("엔비디아")}
          className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        />
        <Button
          name="테슬라"
          onClick={() => handleStockClick("테슬라")}
          className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        />
      </div>
    </div>
  )
}