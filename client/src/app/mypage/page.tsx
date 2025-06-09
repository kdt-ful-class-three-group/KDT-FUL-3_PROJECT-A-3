'use client'
// 컴포넌트
import ProfileCard from "@/components/mypage/ProfileCard"
import UserStatus from "@/components/mypage/UserStatus"
import BadgesSection from "@/components/mypage/BadgesSection"
// 레벨 계산 함수
import { calcLevel } from "@/utils/calcLevel"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/slices/userSlice"
import axios from "axios"
import type { RootState } from "@/store"
import { useSelector } from "react-redux"
import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"

export default function MyPage() {

  const dispatch = useDispatch()
  const router = useRouter()

  // 아직 준비되지 않았을 때를 대비한 기본값 설정
  const {tradeCount =0, tradeVolume=0} = useSelector((state:RootState)=> state.userStatus)

  useEffect(()=>{
    const fetchSet = async()=>{
      try{
        //로그인 유저
        const res = await axios.get('http://localhost:8008/me',{
          withCredentials:true
        })
  
        const idData = res.data?.user_id || '...'
  
        // 레벨계산에 필요한 tradeCount , tradeVolume이 유효할 때만 실행
        if(typeof tradeCount === 'number' && typeof tradeVolume==='number'){

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
              nick:idData,
              level,
              toNextLevel
            })
          )
        }
      }
      catch (err){
        console.log('유저 데이터 찾기 실패')
      }
    }

    //함수 실행
    fetchSet()

  },[tradeCount, tradeVolume])

  
  return (

    <div className="flex flex-col w-full justify-center items-center">
      <ProfileCard />
      <UserStatus />
      <BadgesSection />
      <div className="w-full flex justify-around">
        <Button name='포트폴리오' onClick={()=>router.push('/portfolio')} className="bg-[#B0DB9C] w-1/3 rounded p-3 cursor-pointer"/>
        <Button name='메인' onClick={()=>router.push('/home')} className="bg-[#B0DB9C] rounded p-3 w-1/3 cursor-pointer"/>
      </div>
    </div>
  )
}