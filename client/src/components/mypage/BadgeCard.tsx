// 배지 카드
import { Badge } from "@/types/badge"

export default function BadgeCard({badge}:{badge:Badge}){
  return(
    <div className={`p-4 rounded shadow ${badge.achieved ? 'bg-gray-400' : 'bg-gray-100'}`}>
      <h4 className="text-lg font-semibold">{badge.name}</h4>
      <p className="text-sm text-gray-700">{badge.exp}</p>
    </div>
  )
}