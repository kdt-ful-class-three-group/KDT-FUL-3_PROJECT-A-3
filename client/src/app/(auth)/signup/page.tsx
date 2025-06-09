'use client'
import { SignupForm } from "@/components/auth/signup/SignupForm";
import axios from "axios";
// import { SignupForm } from "@/components/signup/SignupForm"

export default function SignupPage() {

  const handleSignup = async (userData: {
    id: string;
    password: string;
    name: string;
    email: string;
    birth: string;
  }) => {
    try {
      const res = await axios.post(
        "http://localhost:8008/auth/register",
        {
          ...userData,
          user_id: userData.id,
          id: undefined
        },
        { withCredentials: true }
      );
      console.log(res);
      alert("회원가입이 완료되었습니다!");
    } catch (error: any) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      console.error("서버 응답 오류:", error.response?.status);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-4 flex flex-col">
        <h1 className="text-4xl font-bold mb-15 ">회원가입</h1>
        <SignupForm onSignup={handleSignup} />
      </div>
    </div>
  )
}