'use client';

import axios from "axios";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

export function LoginForm() {
  // 아이디, 비밀번호 상태 관리
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();
  
  // 8008에서 데이터 조회
  const checkLogin = async (id: string, pw: string) => {
    try {
      const res = await axios.post(
        "http://localhost:8008/auth/login",
        {
          user_id: id,
          password: pw
        },
        {
          withCredentials: true
        }
      );
      console.log("로그인 성공", res);
      router.push("/home");
    } catch (error) {
      console.log("로그인 실패", error);
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  // 아이디, 비밀번호 변경 함수
  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    await checkLogin(id, pw); // 로그인 체크 함수 호출
    // 부모컴포넌트에서 전달받는 props
    // onLogin(id, pw);
  }
  
  return (
    // 로그인 폼
    <form onSubmit={handleSubmit} className="w-full flex-col flex gap-3" >
      <Input label="" type="text" name="id" placeholder="아이디" value={id} onChange={e => setId(e.target.value)}
      className="w-full p-3 bg-[#B0DB9C]/40 rounded"
      />
      <Input label="" type="password" name="password" placeholder="비밀번호" value={pw} onChange={e=>setPw(e.target.value)}
      className="w-full p-3  bg-[#B0DB9C]/40 rounded"
      />
      {/* 아이디찾기, 비밀번호 찾기, 회원가입으로 이동 */}
      <div className="text-center flex justify-center gap-1 items-center">
        <Link href='/find' className="text-gray-400   hover:text-black text-sm" >아이디/비밀번호 찾기</Link>
        <p className="font-bold text-gray-400">|</p>
        <Link href='/signup' className="text-gray-400 hover:text-black text-sm">회원가입</Link>
      </div>
      <Button type="submit" name="로그인" className="bg-[#B0DB9C] rounded p-3"/>
    </form>
  )
}