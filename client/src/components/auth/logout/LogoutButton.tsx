import axios from "axios";
import { Button } from "@/components/common/Button";

export function LogoutButton() {
  
  const handleLogout = () => {
    axios.post(
      'http://localhost:8008/auth/logout',
      {}, // body
      { withCredentials: true } // config
    ).then(() => {
      console.log("로그아웃 요청 성공");
      // 예: 페이지 이동이나 상태 초기화 등 추가 처리
      window.location.href = 'login'
    }).catch(err => {
      console.error("로그아웃 실패", err);
    });
  }

  return (
    <div>
      <Button
        name="로그아웃"
        onClick={handleLogout}
      />
    </div>
  )
}