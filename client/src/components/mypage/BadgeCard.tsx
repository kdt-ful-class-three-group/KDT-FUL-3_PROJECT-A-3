// 배지 카드
import { Badge } from "@/types/badge"
import { useState } from "react"
import { Button } from "../common/Button"

export default function BadgeCard({badge}:{badge:Badge}){

  // 모달창
  const [showModal, setShowModal]=useState(false)

  return(
    <div className={`p-4 rounded-4xl w-1/4 shadow cursor-pointer ${badge.achieved ? 'bg-gray-400' : 'bg-gray-100'}`}>
      <h4 className="font-semibold text-center" onClick={()=> setShowModal(true)}>{badge.name}</h4>
      {
        showModal && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 text-center flex flex-col gap-5 px-10">
                  <p className="text-lg font-bold">{badge.fullName}</p>
                  <p className="text-sm">{badge.exp}</p>
                  <Button
                    name="닫기"
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-400 rounded p-1 cursor-pointer"
                  />
                </div>
              )
      }
    </div>
  )
}