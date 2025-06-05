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
    <div>
      <p>추천검색어</p>
      <div>
        <Button
          name="애플"
          onClick={() => handleStockClick("애플")}
        />
        <Button
          name="구글"
          onClick={() => handleStockClick("구글")}
        />
        <Button
          name="엔비디아"
          onClick={() => handleStockClick("엔비디아")}
        />
        <Button
          name="테슬라"
          onClick={() => handleStockClick("테슬라")}
        />
      </div>
    </div>
  )
}