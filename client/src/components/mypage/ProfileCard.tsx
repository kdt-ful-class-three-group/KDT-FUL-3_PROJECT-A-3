'use client'
// 프로필
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useEffect, useState } from "react"

export default function ProfileCard(){

  const user = useSelector((state:RootState)=>state.userProfile)
  const [color, setColor]= useState("#ccc")

  // 레벨색상
  useEffect(()=>{
    if(user.level.level===1) setColor('bg-gray-100')
    else if(user.level.level ===2) setColor('bg-gray-300')
    else if(user.level.level ===3) setColor('bg-gray-500')
    else if(user.level.level ===4) setColor('bg-gray-700')
    else if(user.level.level ===5) setColor('bg-gray-900')
    
    else setColor('#ccc')
  },[user])

  return(
    <div className="shadow-lg rounded-lg p-6 bg-gray-200 max-w-md mx-auto w-full">
      <div className="flex items-center space-x-4 mb-4 justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{user.nick}</h2>
          <p className={`bg-white/50 rounded-2xl text-center py-1 text-sm`}>{user.level.name}</p>
        </div>
        <div className={`w-[30%] h-[120px] rounded-full shadow-md ${color} flex justify-center items-center`}>
          <p className="text-4xl">{user.level.level}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-3 shadow-inner flex flex-col gap-3">
        <p className="font-bold text-lg">"{user.level.exp}"</p>
        {/* <p className="text-xs">다음 레벨까지</p> */}
        <div className="flex justify-around">
          <p className="p-2 border-b-4 border-gray-200">남은 횟수 <span className="font-bold">{user.toNextLevel.count}</span></p>
          <p className="p-2 border-b-4 border-gray-200">남은 금액 <span className="font-bold">{user.toNextLevel.volume}</span></p>

        </div>
      </div>
    </div>
  )
}