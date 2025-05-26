"use client";
import axios from "axios";
// 컴포넌트 가져오기
import LoginForm from "@/components/login/LoginForm";
import AuthButton from "@/components/login/AuthButton";

export default function LoginPage(){

  // 8008에서 데이터 조회
  const checkLogin = async(id: string, pw: string) => {
    try {
      const res = await axios.post(
        "http://localhost:8008/auth/login",
        { user_id: id, password: pw },
        { withCredentials: true }
      );
      console.log(res);
      alert("성공했습니다");
    } catch (error: any) {
      alert("다시 입력해주세요");
      console.error("서버 응답 오류:", error.response?.status);
    }
  }

  return(
    <div>
      {/* 페이지 이름 */}
      <h1>로그인</h1>
      {/* 로그인폼 */}
      <LoginForm onLogin={checkLogin}/>    
      {/* 간편로그인 */}
      <div>
        <p>간편로그인_추가</p>
        <AuthButton />
      </div>
    </div>

  )
}