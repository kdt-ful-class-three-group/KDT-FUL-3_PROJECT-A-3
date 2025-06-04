'use client'
// 프로필
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export default function ProfileCard(){

  const user = useSelector((state:RootState)=>state.userProfile)

  return(
    <div>
      <h2>{user.nick}</h2>
      <div>
        <h4>레벨 : {user.level.level}</h4>
        <p>{user.level.name}</p>
        <p>{user.level.exp}</p>
        <p>다음 레벨까지 남은 횟수 {user.toNextLevel.count} 남은 금액 {user.toNextLevel.volume}</p>
      </div>
    </div>
  )
}