// 타입
import { Input } from "../common/Input"
import { Select } from "../common/Select"

export default function TradeFilter(){

  return(
    <div>
      {/* 전체 선택 */}
      {/* 날짜 */}
      <div>
        <Input type="date" label="시작"/>
        <Input type="date" label="종료"/>
      </div>
      {/* 종목 */}
      <div>
        <Select option={[{name:'',value:''}]}></Select> 
      </div>
      {/* 거래 */}
      <div>
        <Select option={[{name:'',value:''}]}></Select>
      </div>
    </div>
  )
}