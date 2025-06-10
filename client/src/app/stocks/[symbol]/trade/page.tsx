'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { TradeContent } from '@/components/trade/TradeContent'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTrade } from '@/store/slices/tradeSlice'
import axios from 'axios'
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