'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { TradeContent } from '@/components/trade/TradeContent'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTrade } from '@/store/slices/tradeSlice'
import axios from 'axios'
// *가이드
import introJS from 'intro.js'
import 'intro.js/introjs.css'
import { runGuide, waitElements } from '@/utils/makeGuide'
import { useIsLoginCheck } from '@/hooks/useIsLoginCheck'

export default function TradePage() {
  const params = useParams();
  const symbol = typeof params?.symbol === 'string' ? params.symbol : '';
  const searchParams = useSearchParams()
  const tradeType = searchParams.get('type') as string | null;
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');

      // * 페이지에 진입하면,
    useIsLoginCheck({authStatus, setAuthStatus});

  // *가이드 - sessionStorage start-trade-guide
  useEffect(()=>{
    const intro = introJS()

    const startGuide = sessionStorage.getItem('start-trade-guide')
    // 값이 있으면
    if(startGuide){
      
      // dom요소가 렌더링 될때를 시점으로 설정
      const clear = waitElements(['#stock','#value','#button'],()=>{
        runGuide({
          steps:[
              {
                element:'#stock',
                intro:'해당 주식의 정보 입니다'
              },{
                element:'#value',
                intro: '원하는 수량을 입력하면 총 가격이 계산됩니다'
              },{
                element:'#button',
                intro:'버튼을 누르면 거래가 진행됩니다'
              }
            ],
            onComplete:()=> sessionStorage.removeItem('start-trade-guide'),
            onExit:()=>sessionStorage.removeItem('start-trade-guide')
        })
      })
      
      return clear
      
    }
  },[])

  // redux에서 저장했지만 새로고침하면 초기화되기때문에 다시 서버에 요청
  useEffect(() => {
    if (!symbol || !tradeType) return;

    const fetchPrice = async () => {
      try {
        // 종목 제대로 가져오는지 확인
        console.log('종목확인용', symbol)
        const res = await axios.get(`http://localhost:8008/stocks/${symbol}`)
        // 종가
        const price = res.data?.values?.[0]?.close;
        
        if (tradeType === 'buy' || tradeType === 'sell') {
          dispatch(setTrade({ symbol, price, type: tradeType }))
        }
        setLoading(false)
      } catch (err) {
        console.error('가격 정보 불러오기 실패:', err)
        router.back()
      }
    }

    fetchPrice()
  }, [symbol, tradeType, dispatch, router])

  if (loading) return <p>가격 정보를 불러오는 중입니다...</p>

      // * 상탯값이 변경 되기전에는 로딩중 화면이 뜨게 만듦.
    if (authStatus === 'loading') {
      return <div>로딩 중...</div>;
    }
  
    // * 상탯값이 ok일 경우 홈페이지 화면이 뜨게 만듦.
    if (authStatus === 'ok') {

  return (
    <div className=''>
      {['buy', 'sell'].includes(tradeType || '') && (
        <TradeContent mode={tradeType as 'buy' | 'sell'} />
      )}
    </div>
  )
}
  return null;
}