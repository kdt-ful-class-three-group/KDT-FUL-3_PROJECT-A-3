import { Button } from "../common/Button"
//차트
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'
import { useMemo } from "react"


export default function MyStock({account, money}:{account:string, money:string}){

  //!차트데이터 (임시)
  // date, money (asset)
  const moneyData = [
    {date:'2025-05-28',asset:money} // 계좌 생성 직후
  ]
  

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
        <Line data={data} options={options}/>
      </div>
    </div>
  )
}