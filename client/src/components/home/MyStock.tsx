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
//차트 요소 등록
ChartJS.register(LineElement, CategoryScale,LinearScale, PointElement, Tooltip, Legend)

export default function MyStock({account, money}:{account:string, money:string}){

  //!차트데이터 (임시)
  // date, money (asset)
  const moneyData = [
    {date:'2025-05-28',asset:Number(money)} // 계좌 생성 직후
  ]
  
  //차트용 데이터
  const data = useMemo(()=>({
    labels: moneyData.map(item=>item.date),
    datasets:[
      {
        label:'자산',
        data:moneyData.map(item=>item.asset),
        borderColor:'#ccc',
        backgroundColor:'rgba(229,229,229,0.2)',
        fill : true,
        tension: 0.3,
        pointRadius:3,
      }
    ]
  }),[moneyData])

  //차트옵션
  const options = {
    responsive:true,
    plugins:{
      legend:{
        display:false,
      },
      tooltip:{
        callbacks:{
          label:(ctx:any)=>`${ctx.parsed.y.toLocaleString()}`
        }
      }
    },
    scales:{
      y:{
        ticks:{
          callback:(value:number)=>`${Number(value).toLocaleString()}`
        }
      }
    }
  }

  return (
    <div>
      <div>
        <p>내 계좌</p>
        <p>{account}</p>
      </div>
      <div>
        <p>{money}</p>
        {/* 마이페이지로 이동 */}
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