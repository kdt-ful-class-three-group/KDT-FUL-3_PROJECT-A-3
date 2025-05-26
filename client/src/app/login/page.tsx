"use client";
// 컴포넌트 가져오기
import LoginForm from "@/components/login/LoginForm";
import AuthButton from "@/components/login/AuthButton";

export default function LoginPage(){

  // 8008에서 데이터 조회
  const checkLogin = async(id:string, pw:string)=>{
    const rest = await fetch('http://localhost:8008/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id,pw})
    })

    const data = await rest.json()

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