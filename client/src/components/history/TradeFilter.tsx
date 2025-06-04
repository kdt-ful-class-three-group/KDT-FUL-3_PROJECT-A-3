// 타입
import { Input } from "../common/Input"
import { Select } from "../common/Select"
import { Button } from "../common/Button"

// 전달받은 props 타입 설정
type Props = {
  stock : string[];
  selectedStock : string;
  selectedType : string;
  startDate:string;
  endDate:string;
  setSelectedStock : (val:string)=>void
  setSelectedType: (val:string)=>void
  setStartDate : (val:string)=>void
  setEndDate : (val:string)=>void
}

export default function TradeFilter({
  stock, selectedStock, selectedType, startDate, endDate, setSelectedStock, setSelectedType, setStartDate, setEndDate
}:Props){

  // 전체 추가
  const stockOption = [{name:'전체', value:'all'}]
  stock.forEach(i=>{
    stockOption.push({name:i, value:i})
  })

  // 초기화
  const resetBtn = ()=>{
    setSelectedStock('all')
    setSelectedType('all')
    setStartDate('')
    setEndDate('')
  }

  return(
    <div style={{display:'flex'}}>
      {/* 전체 선택 */}
      <Button name="전체" onClick={resetBtn}/>
      {/* 날짜 */}
      <div style={{display:'flex'}}>
        <Input type="date" label="시작" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
        <Input type="date" label="종료" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
      </div>
      {/* 종목 */}
      <div>
        <Select option={stockOption} value={selectedStock} onChange={(e)=>setSelectedStock(e.target.value)}></Select> 
      </div>
      {/* 거래 */}
      <div>
        <Select option={[{name:'전체',value:'all'},{name:'구매',value:'구매'},{name:'판매',value:'판매'}]} value={selectedType} onChange={(e)=>setSelectedType(e.target.value)}></Select>
      </div>
    </div>
  )
}