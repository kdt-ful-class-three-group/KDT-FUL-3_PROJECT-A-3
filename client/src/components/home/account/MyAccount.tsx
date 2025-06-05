import { Button } from "../../common/Button"
import styles from './AccountStyles.module.css'
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
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { useRouter } from "next/navigation"
import axios from "axios"
import { setSymbolPrice } from "@/store/slices/symbolPriceSlice"
//차트 요소 등록
ChartJS.register(LineElement, CategoryScale,LinearScale, PointElement, Tooltip, Legend, Filler)

export default function MyAccount(){
  const dispatch = useDispatch()
  const { account_number, asset } = useSelector((state: RootState) => state.account)
  const symbolPrices = useSelector((state: RootState) => state.symbolPrice)

  // * 자산 + 보유주식의 총 가격의 합을 관리하는 상탯값.
  // * 초기값은 자산으로 둔다.
  const [totalAsset, setTotalAsset] = useState(Number(asset))

  // * 현재 애플리케이션에 정의한 심볼들 10개를 symbols로 정의
  // * 슬라이스에서 이니셜스테이트로 지정한 심볼들도 아래와 같음.
  const symbols = ['TSLA', 'GOOGL', 'NVDA', 'AAPL', 'AMZN', 'NFLX', 'META', 'SBUX']

  // * 주식의 현재 가격 조회 로직
  useEffect(() => {
    const getPrices = async () => {
      // * for of 문으로 위에서 지정한 symbols의 배열을 반복
      for (const symbol of symbols) {
        try {
          const res = await axios.get(`http://localhost:8008/stocks/${symbol}`)
          // * res.data가 존재하는지? 그안에 values가 존재하는지? [0]의 데이터가 존재하는지? 그안에 close라는 요소가 존재하는지?
          // * 위의 뜻을 요약한 코드가 아래 price코드
          const price = res.data?.values?.[0]?.close
          // * 만일 price가 true 즉 값이 있다면,
          if (price) {
            // * 해당 심볼과 프라이스의 데이터를 SymbolPrice에 업데이트,
            dispatch(setSymbolPrice({ symbol, price }))
          }
        } catch (error) {
          // * 에러가 난다면 가격로딩 실패 표출
          console.error(`${symbol} 가격 로딩 실패`, error)
        }
      }
    }
    // * 위의 함수를 실행.
    getPrices()
    // * dispatch의 값이 변할 때 마다 재 실행.
  }, [dispatch])

  // 2. 보유 주식 조회 + 총 자산 계산
  useEffect(() => {
    const getStockAsset = async () => {
      try {
        // * 보유주식 데이터를 뱉어내는 엔드포인트에 포스트 요청
        const res = await axios.post(
          "http://localhost:8008/userportfolio/calc",
          {},
          // * 쿠키 데이터를 포함해서 보낸다.
          { withCredentials: true }
        )

        // * 포트폴리오 라는 변수에 위의 요청에 대한 응답을 담는다.
        // * 데이터의 형식은 { symbol: 뭐, much: n } 의 형태로 해당 심볼과 보유 주식이 몇개인지가 담김.
        const portfolio = res.data

        // * 총주식 가격의 초기값을 0으로 잡아두고 시작.
        let stockValue = 0
        // * portfolio의 데이터 형식에 맞춰서 for of 문을 작성
        for (const item of portfolio) {
          // * portfolio의 데이터 형식은 { symbol: 뭐, much: n } 이기에 해당 데이터를 const { symbol, much }에 item의 데이터를 담음.
          const { symbol, much } = item
          // * 현재 symbol의 가격을 가져오고, 만약 가격정보가 없다면 0으로 가져옴.
          const price = symbolPrices[symbol]?.price || 0
          // * stockValue의 값은 현재가 * 보유주식 수 로 배열이 돌 때마다 이전값에 더해서 갱신 해준다.
          stockValue += price * much
        }

        // * 반복이 끝난후, totalAsset의 값을 현재 자산 + stockValue로 한다.
        setTotalAsset(Number(asset) + stockValue)
      } catch (err) {
        console.error("총 자산 계산 실패:", err)
      }
    }

    getStockAsset()
  // * 위의 함수는 asset값과 symbolPrices값이 변경 될 때마다 갱신 된다.
  }, [asset, symbolPrices])


    const router = useRouter()

  //!차트데이터 (임시)
  // date, money (asset)
  const moneyData = [
    {date:'계좌만든 날',asset:1000000}, // 계좌 생성 직후
    // * asset의 값은 갱신된 totalAsset값
    {date:'오늘',asset: totalAsset}, // 오늘
  ]

  // console.log('총자산:',totalAsset);

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
    <div className="justify-items-start w-full border-2 border-gray-300 rounded-lg p-4 mb-4">
      <div className="">
        <p>내 계좌</p>
        <p>{account_number}</p>
      </div>
      <div>
        <p>{asset}</p>
        {/* 마이페이지로 이동 */}
        <Button name='>' type='button' onClick={()=>router.push('/portfolio')}/>
      </div>
      <div>
        <p>금액 변동률</p>
      </div>
      <div className="flex item-center justify-center w-full max-w-[300px] p-4 bg-white rounded-lg shadow-md shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <Line data={data} options={options}/>
      </div>
    </div>
  )
}