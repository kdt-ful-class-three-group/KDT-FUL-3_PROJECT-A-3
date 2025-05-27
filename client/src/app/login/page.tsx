"use client";

// 컴포넌트 가져오기
import LoginForm from "@/components/login/LoginForm";
import AuthButton from "@/components/login/AuthButton";
import { useRouter } from "next/navigation";

export default function LoginPage(){
  const router = useRouter();
  
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
   if(res.ok){
     console.log('로그인 성공');
     router.push('/home'); 
        }
   else{
        console.log("로그인 실패")
        // 로그인 실패시 alert
     alert("아이디 또는 비밀번호가 틀렸습니다.")
    //  router.push('/login');
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