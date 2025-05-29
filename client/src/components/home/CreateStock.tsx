// 계좌 생성 버튼
import { Button } from "../common/Button"

type props = {
  onClick:()=>void
}

export default function CreateStock({onClick}:props){

    const createAccount = () => {
        confirm("계좌를 생성하시겠습니까?");

    }

  return(
    <div style={{display:'flex', cursor:'pointer'}} onClick={createAccount}>
      <Button variant="icon" icon="plus"/>
      <p>계좌 생성</p>
    </div>
  )
}