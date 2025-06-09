// 배지 카드
import { Badge } from "@/types/badge"

export default function BadgeCard({badge}:{badge:Badge}){
  return(
    <div className={`p-4 rounded-4xl w-1/4 shadow ${badge.achieved ? 'bg-gray-400' : 'bg-gray-100'}`}>
      <h4 className="font-semibold text-center">{badge.name}</h4>
      {/* <p className="text-sm text-gray-700">{badge.exp}</p> */}
    </div>
  )
}