// !임시데이터
//타입
enum TradType {
  Buy = 0,
  Sell = 1
}
type tradeItem = {
  id:number; //계좌순서
  account_number: number; //계좌
  user_name:string; //유저
  stock_name:string//종목명
  price:number; //거래 당식 종목 가격
  much: number; //거래량
  buy_sale : TradType; //구매 또는 판매
  date: string; //거래일자
}

// props 타입
type Props = {
  trades:tradeItem[]
}

//! 더미데이터
// 데이터 가공 함수
import { DonutChartData } from "@/utils/chartData";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart({trades}:Props){

  // 가공된 데이터
  const {labels, data} = DonutChartData(trades)

  //? 라벨에 퍼센트 표시
  const total = data.reduce((sum, val)=>sum+val,0)
  const percLabel = labels.map((label,i)=>{
    const perc = ((data[i]/total)*100).toFixed(1)

    return `${label} (${perc}%)`
  })

  // 차트데이터
  const chartData = {
    labels : percLabel, //? 라벨에 퍼센트 표시
    datasets:[
      {
        label:'총 거래량',
        data,
        backgroundColor:[
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#5D9CEC",
          "#48CFAD",
          "#A0D468",
        ],
        BsBorderWidth:1
      }
    ]
  }

  return(
    <Doughnut data={chartData} />
  )
}