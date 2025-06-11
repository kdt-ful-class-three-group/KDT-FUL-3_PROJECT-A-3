'use client'
import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"
import DoughnutChart from "@/components/portfolio/Doughnut"
import { tradeItems } from "@/components/portfolio/mocks/tradeItem"
import {Summary} from "@/components/portfolio/Summary"
import HoldingsList from "@/components/portfolio/HoldingsList"
// ! 거래내역 -> 보유 자산 리스트
import { getHoidingWithAvg } from "@/utils/getHoldings"
import { useEffect, useState } from "react"
import axios from "axios"
import { stockList } from "@/components/stocks/StockList"
import { TradeItem } from "@/types/tradeItem"
import {MdKeyboardArrowLeft} from "react-icons/md";
import {setSelectedTab} from "@/store/slices/stockSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import StockShow from "@/components/simulation/StockShow";
import { useIsLoginCheck } from "@/hooks/useIsLoginCheck"

export type HoldingItem={
  symbol:string;
  quantity:number; //매수 총량 - 매도 총량
  avgPrice : number ; //평균 매수 단가
  currentPrice: number //현재 주가 - 정의한 가격 사용
}


export default function portfolioPage(){


  const dispatch = useDispatch()
  const selectedTab = useSelector((state:RootState)=>state.stock.selectedTab)


  //데이터
  const [tradeData, setTradeData]=useState<TradeItem[]>([])
  // 자산 관련
  const [totalValue, setTotalValue] =useState(0) //보유수량 X 현재가
  const [invested, setInvested] = useState(0) // 매수수량 x 매수 단가
  //종목 별 리스트
  //현재가
  const [currentPrices, setCurrentPrices]= useState<Record<string,number>>({})
  //보유 종목 계산
  const [holdingData, setHoldingData]=useState<HoldingItem[]>([])
  
  const router = useRouter()
  
  //stocklist에서 symbol 뽑기
  const symbols:string[]= stockList.map(i=>i.symbol)
  
  //현재가 가져오기
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const tradeRes = await axios.post(`${process.env.NEXT_PUBLIC_URL}/userportfolio/history`,{},{withCredentials:true})
        setTradeData(tradeRes.data)
        
        //각 symbol에 대해 개별 요청 -> 병렬 처리
        const stockRes = await Promise.all(
          symbols.map(symbol=>
            axios.get(`${process.env.NEXT_PUBLIC_URL}/stocks/${symbol}`).then(res=>({symbol, price:res.data?.close || 0}))
          )
        )
        
        //symbol:price 형태로 변환해서 상태 저장
        const prices : Record<string,number> = {}
        stockRes.forEach(item=>{
          prices[item.symbol]= item.price
        })
        
        setCurrentPrices(prices)
        
        
      }
      catch(err){
        console.log('주식 데이터 가져오기 실패',err)
      }
    }
    
    fetchData()
  },[])
  
  // 상태 받은 후 계산 따로 처리
  useEffect(()=>{
    if(tradeData.length>0 && Object.keys(currentPrices).length>0){
      const holdingData = getHoidingWithAvg(tradeData,currentPrices)
      setHoldingData(holdingData)

      // 디버깅
      // console.log('holding',holdingData)

      // 총 자산 계산
      const totalVal = holdingData.reduce((sum,h)=>sum+h.quantity*h.currentPrice,0)
      setTotalValue(Math.round(totalVal))//소수점 제거

      //투자금 계산
      const investedVal = tradeData.filter((t:TradeItem)=>t.buy_sell===true).reduce((sum,t)=>{
        const price = Number(t.price)
        const much = Number(t.much)
        return sum + price*much
      },0)
      setInvested(Math.round(investedVal))
    }
  },[tradeData,currentPrices])

    const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');
  
    // * 페이지에 진입하면,
    useIsLoginCheck({authStatus, setAuthStatus});
  
  
    // * 상탯값이 변경 되기전에는 로딩중 화면이 뜨게 만듦.
    if (authStatus === 'loading') {
      return <div>로딩 중...</div>;
    }
  
    // * 상탯값이 ok일 경우 홈페이지 화면이 뜨게 만듦.
    if (authStatus === 'ok') {

  return (
      <div className="w-full max-w-xs md:max-w-lg lg:max-w-lg mx-auto">
        {/* 뒤로가기 */}
        <MdKeyboardArrowLeft className="w-10 h-10 cursor-pointer" name="뒤로가기" onClick={() => router.back()}/>
        {/* 총 자산 요약 */}
        <div
            className="flex flex-col-reverse w-full m-3 px-2 shadow-lg rounded-lg p-4 justify-between items-center md:flex-row md:space-x-8">
          <Summary totalValue={totalValue} investedAmount={invested}/>
          {/* 도넛 차트 */}
          <div className="w-full max-w-xs mx-auto md:max-w-sm">
            <DoughnutChart trades={tradeData}/>
          </div>
        </div>

        {/*<HoldingsList items={holdingData}/>*/}

        <Button
            name="보유"
            onClick={() => dispatch(setSelectedTab('보유'))}
            className={`w-28 py-1 rounded-full text-sm font-medium mx-2 ${
                selectedTab === '보유'
                    ? 'bg-gray-800 text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
            }`}
        />
        <StockShow btnValue={selectedTab}/>
      </div>
  )
}
  return null;
}