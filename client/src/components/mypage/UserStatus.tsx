'use client'
// 주식관련
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import { getUserStatus } from "@/store/slices/userStatusSlice"
import { useEffect } from "react"
import type { RootState, AppDispatch } from "@/store"
import { Button } from "../common/Button"
import { useRouter } from "next/navigation"

export default function UserStatus(){

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  //상태값 가져오기
  const {tradeCount, tradeVolume, loading, error} = useSelector((state:RootState)=> state.userStatus)

  // 유저
  const nick = useSelector((state:RootState)=> state.userProfile.nick)

  useEffect(()=>{
    // 유저 데이터를 가져왔을때
    if(nick){
      
      dispatch(getUserStatus(nick))
    }
  },[dispatch,nick])

  return(
    <div>
      {/* 투자횟수, 성공률, 보유 자산 */}
      <p>투자 횟수 : {tradeCount}</p>
      {/* 많이 거래한 내역 3개 */}
      {/* 포트폴리오 이동 버튼 */}
      <Button name='포트폴리오' onClick={()=>router.push('/portfolio')}/>
    </div>
  )
}