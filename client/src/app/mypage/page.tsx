'use client'
// 컴포넌트
import ProfileCard from "@/components/mypage/ProfileCard"
import UserStatus from "@/components/mypage/UserStatus"
import BadgesSection from "@/components/mypage/BadgesSection"
// ! 레벨 계산에 필요한 더미 데이터
import { tradeItems } from "@/components/portfolio/mocks/tradeItem"
// 레벨 계산 함수
import { calcLevel } from "@/utils/calcLevel"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/slices/userSlice"

export default function MyPage() {

  const dispatch = useDispatch()

  useEffect(()=>{
    // 레벨계산에 필요한 tradeCount , tradeVolume
    // tradeCount - 거래 총 횟수 - length
    const tradeCount = tradeItems.length
    // tradeVolume - 누적 거래 금액 - price*much 합
    const tradeVolume = tradeItems.reduce((total,item)=>{
      return total+item.price*item.much
    },0)
    // 레벨 계산
    const level = calcLevel(tradeCount, tradeVolume)
    //다음 레벨까지 계산 함수
    const toNext = ()=>{
      if(level.level===1) return {count : 2-tradeCount, volume: 10000-tradeVolume}
      if(level.level===2) return {count : 5-tradeCount, volume: 30000-tradeVolume}
      if(level.level===3) return {count : 10-tradeCount, volume: 60000-tradeVolume}
      if(level.level===4) return {count : 20-tradeCount, volume: 100000-tradeVolume}
      return 0 //최고레벨
    }
    const toNextLevel = toNext()

    // 값 적용
    dispatch(
      setUser({
        nick:'',
        level,
        toNextLevel
      })
    )

  },[])

  
  return (

    <div>
      <ProfileCard />
      <UserStatus />
      <BadgesSection />
    </div>
  )
}