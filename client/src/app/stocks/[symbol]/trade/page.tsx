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

export default function TradePage() {
  const params = useParams();
  const symbol = typeof params?.symbol === 'string' ? params.symbol : '';
  const searchParams = useSearchParams()
  const tradeType = searchParams.get('type') as string | null;
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // *가이드 - sessionStorage start-trade-guide
  useEffect(()=>{
    const intro = introJS()

    const startGuide = sessionStorage.getItem('start-trade-guide')
    // 값이 있으면
    if(startGuide){
      
      // dom요소가 렌더링 될때를 시점으로 설정
      const interval = setInterval(()=>{
        const stockEl = document.querySelector('#stock')
        const valueEl = document.querySelector('#value')
        const buttonEl = document.querySelector('#button')
        
        // 다 로드 되었을때
        if(stockEl && valueEl && buttonEl){
          clearInterval(interval)
          
          // 가이드 내용
          intro.setOptions({
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
            showProgress: true,
            exitOnOverlayClick: false,
            nextLabel: '다음',
            prevLabel: '이전',
            doneLabel: '완료',
          }).start()

          //완료시
          intro.oncomplete(()=>{
            // 가이드 관련 값 삭제
            sessionStorage.removeItem('start-trade-guide')
          })

          //중단
          intro.onexit(()=>{
            sessionStorage.removeItem('start-trade-guide')
          })
        }
      },100)

      // 언마운트시 정리
      return ()=>clearInterval(interval)
      
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

  return (
    <div className=''>
      {['buy', 'sell'].includes(tradeType || '') && (
        <TradeContent mode={tradeType as 'buy' | 'sell'} />
      )}
    </div>
  )
}