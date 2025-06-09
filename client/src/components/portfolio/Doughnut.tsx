// !임시데이터
//타입
import { TradeItem } from "@/types/tradeItem";

// props 타입
type Props = {
  trades:TradeItem[]
}

//! 더미데이터
// 데이터 가공 함수
import { DonutChartData } from "@/utils/chartData";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// ? 차트에 퍼센트 표현을 위한 플러그인
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default function DoughnutChart({trades}:Props){

  // 가공된 데이터
  const {labels, data} = DonutChartData(trades)

  //? 라벨에 퍼센트 표시
  const total = data.reduce((sum, val)=>sum+val,0) ||1
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
        borderWidth:1
      }
    ]
  }

  // ? 차트 플러그인 사용 -> 차트에 퍼센트 표시
  const chartOptions ={
    plugins: {
      datalabels:{
        formatter: (value:number, context:any)=>{
          const total = context.chart.data.datasets[0].data.reduce(
            (sum:number, val:number)=> sum+val,
            0
          )
          const perc = ((value/total)*100).toFixed(1)
          return `${perc}%`
        },
        color:'#fff',
        font : {
          weight: 'bold',
          size: 13,
        }
      },
      legend:{
        position:'bottom' as const,
        labels:{
          usePointStyle: true,
          pointStyle: 'circle' as const,
        }

      }
    }
  }

  return(
    <Doughnut data={chartData} options={chartOptions}/>
  )
}