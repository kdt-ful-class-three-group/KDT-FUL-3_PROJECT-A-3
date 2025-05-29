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
  Legend,
  Filler
} from 'chart.js'
import { useMemo } from "react"
//차트 요소 등록
ChartJS.register(LineElement, CategoryScale,LinearScale, PointElement, Tooltip, Legend, Filler)

export default function MyStock({account, money}:{account:string, money:string}){

  //!차트데이터 (임시)
  // date, money (asset)
  const moneyData = [
    {date:'계좌만든 날',asset:1000000}, // 계좌 생성 직후
    {date:'오늘',asset:money}, // 오늘
  ]
  
  //차트용 데이터
  const data = useMemo(()=>({
    labels: moneyData.map(item=>item.date),
    datasets:[
      {
        label:'자산',
        data:moneyData.map(item=>item.asset),
        borderColor:'#000',
        backgroundColor:'rgba(0,0,0,0.6)',
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
          label:(ctx:any)=>`${ctx.parsed.y.toLocaleString()}풀`
        }
      }
    },
    scales:{
      x:{
        // x축 범위 설정
        min:0, //시작은 첫 데이터
        max: Math.max(4,moneyData.length-1),//최소 5칸 확보
      },
      y:{
        ticks:{
          callback:(value:string|number)=> value===1000000 ? '1,000,000':''
        },
        min:0,
        max:1200000,
        grid:{
          display:false //격자 안보이게 처리
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