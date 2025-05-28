// 계좌 생성 버튼
import { Button } from "../common/Button"

export default function CreateStock(){

  return(
    <div style={{display:'flex'}}>
      <Button variant="icon" icon="plus"/>
      <p>계좌 생성</p>
    </div>
  )
}