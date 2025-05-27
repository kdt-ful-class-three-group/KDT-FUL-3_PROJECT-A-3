'use client';

import axios from "axios";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

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
    <form onSubmit={handleSubmit}>
      <Input label="" type="text" name="id" placeholder="아이디" value={id} onChange={e => setId(e.target.value)}/>
      <Input label="" type="password" name="password" placeholder="비밀번호" value={pw} onChange={e=>setPw(e.target.value)}/>
      {/* 아이디찾기, 비밀번호 찾기, 회원가입으로 이동 */}
      <div>
        <Link href='/find'>아이디/비밀번호 찾기</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
      <Button type="submit" name="로그인"/>
    </form>
  )
}