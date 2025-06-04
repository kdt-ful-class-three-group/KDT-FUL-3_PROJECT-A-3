// 배지 카드
import { Badge } from "@/types/badge"

export default function BadgeCard({badge}:{badge:Badge}){
  return(
    <div style={{backgroundColor: badge.achieved ? '#aaa' : '#eee'}}>
      <h4>{badge.name}</h4>
      <p>{badge.exp}</p>
    </div>
  )
}