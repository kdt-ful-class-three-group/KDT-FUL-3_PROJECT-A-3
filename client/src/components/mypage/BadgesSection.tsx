// 배지, 업적 관련
import BadgeCard from "./BadgeCard"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { evaluateBadges } from "@/utils/evaluateBadges"

export default function BadgesSection(){
  // slice에서 값 가져오기
  const {tradeCount, tradeVolume} = useSelector((state:RootState)=>state.userStatus)
  const {level} = useSelector((state:RootState)=>state.userProfile)

  const badges = evaluateBadges({tradeCount, tradeVolume, level})

  return(
    <div className="w-full p-6">
      {/* 배지, 업적 */}
      <div className="flex flex-wrap gap-5 justify-center">
        {
          badges.map(item=>(
            <BadgeCard badge={item}  key={item.id}/>
          ))
        }

      </div>
    </div>
  )
}