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
import { BsBorderWidth } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart({trades}:Props){

  // 가공된 데이터
  const {labels, data} = DonutChartData(trades)

  // 차트데이터
  const chartData = {
    labels,
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