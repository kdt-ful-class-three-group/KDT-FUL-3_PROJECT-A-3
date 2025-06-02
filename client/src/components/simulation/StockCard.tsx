import { useGetStockBySymbolQuery } from "@/store/slices/stockApi";
import { stockList } from "../stocks/StockList";

export default function StockCard({symbol}:{symbol:string}){

  const { data, error, isLoading } = useGetStockBySymbolQuery(symbol)

  // 에러, 로딩처리
  if(isLoading) return <p>{symbol} 로딩 중...</p>
  if(error) return <p>{symbol} 에러 발생</p>
  // 데이터 부족
  const values = data?.values
  if(!values || values.length<2) return <p>{symbol} 데이터 부족</p>

  // 값 가져오기
  const current = Number(values[0].close)
  const prevClose = Number(values[1].close)
  const comparison = current-prevClose
  const change = (comparison/prevClose)*100

  const name = stockList.find(stock=> stock.symbol === symbol)?.name || symbol

  const item = {name, current, comparison, change}


  return(
    <div style={{display:'flex', gap:'25px'}}>
      <div>
        <h4>{item.name}</h4>
      </div>
      <div>
        <p>{item.current}</p>
        <p>{item.comparison}원 ({item.change.toFixed(2)}%)</p>
      </div>
    </div>
  )
}