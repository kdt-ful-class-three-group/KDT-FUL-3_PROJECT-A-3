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
  const {tradeCount, tradeVolume, topTrades, loading, error} = useSelector((state:RootState)=> state.userStatus)

  // 유저
  const nick = useSelector((state:RootState)=> state.userProfile.nick)
  // 자산 - accountslice에 asset
  // ! 가져오긴 했는데 값이 없어서 임의로 설정
  const asset = useSelector((state:RootState)=> state.account.asset)
  // ! 성공률 ? - 표시할 거 라면 따로 값 필요함


  useEffect(()=>{
    // 유저 데이터를 가져왔을때
    if(nick){
      
      dispatch(getUserStatus(nick))
    }
  },[dispatch,nick])

  return(
    <div>
      {/* 로딩, 에러 */}
      {loading && <p>로딩 중 ...</p>}
      {error && <p>{error}</p>}
      {/* 투자횟수, 성공률, 보유 자산 */}
      <p>투자 횟수 : {tradeCount}</p>
      <p>보유 자산 : {asset || 100000} </p>
      {/* 많이 거래한 내역 3개 */}
      <div>
        <h3>거래 TOP3</h3>
        {topTrades.map(item=>(
          <p key={item.id}>{item.stock_name}</p>
        ))}
      </div>
      {/* 포트폴리오 이동 버튼 */}
      <Button name='포트폴리오' onClick={()=>router.push('/portfolio')}/>
    </div>
  )
}