// 컴포넌트
import ProfileCard from "@/components/mypage/ProfileCard"
import UserStatus from "@/components/mypage/UserStatus"
import BadgesSection from "@/components/mypage/BadgesSection"

export default function MyPage() {
  
  return (

    <div>
      <ProfileCard />
      <UserStatus />
      <BadgesSection />
    </div>
  )
}