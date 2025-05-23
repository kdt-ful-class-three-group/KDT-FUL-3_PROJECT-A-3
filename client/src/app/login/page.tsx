"use client";
// 컴포넌트 가져오기
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage(){

  return(
    <div>
      {/* 페이지 이름 */}
      <h1>로그인</h1>
      {/* 로그인폼 */}
      <LoginForm onLogin={(id, pw) => console.log(id, pw)}/>    
      {/* 간편로그인 */}
      <div>
        <p>간편로그인_추가</p>
      </div>
    </div>

  )
}