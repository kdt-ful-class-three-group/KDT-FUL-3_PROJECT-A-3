import { Button } from "../common/Button"

export default function MyStock({account, money}:{account:string, money:string}){

  //차트데이터
  // date, money (asset)

  return (
    <div>
      <div>
        <p>내 계좌</p>
        <p>{account}</p>
      </div>
      <div>
        <p>{money}</p>
        <Button name='>' type='button'/>
      </div>
      <div>
        <p>금액 변동률</p>
      </div>
      <div>
        <p>차트</p>
      </div>
    </div>
  )
}