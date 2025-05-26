"use client";
// 컴포넌트 가져오기
import LoginForm from "@/components/login/LoginForm";
import AuthButton from "@/components/login/AuthButton";

export default function LoginPage(){

  // 8008에서 데이터 조회
  const checkLogin = async(id:string, pw:string)=>{
    const res = await fetch('http://localhost:8008/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      body:JSON.stringify({user_id:id,password:pw})
    })

    //디버깅
    console.log(res)

    //로그인 정보 없을 때
    if(!res.ok){

      //!로그인 실패
      alert('다시 입력해주세요')

      console.error('서버 응답 오류:',res.status)
    }

    //!로그인 성공
    alert('성공했습니다')

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