// 계좌 생성 버튼
import { Button } from "../common/Button"

type props = {
  onClick:()=>void
}

export default function CreateStock({onClick}:props){

  return(
    <div style={{display:'flex', cursor:'pointer'}} onClick={onClick}>
      <Button variant="icon" icon="plus"/>
      <p>계좌 생성</p>
    </div>
  )
}