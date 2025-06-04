// 타입
import { Input } from "../common/Input"
import { Select } from "../common/Select"
import { Button } from "../common/Button"

export default function TradeFilter(){

  // 상태
  // value

  return(
    <div style={{display:'flex'}}>
      {/* 전체 선택 */}
      <Button name="전체" />
      {/* 날짜 */}
      <div style={{display:'flex'}}>
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