import { useState, FormEvent } from "react";
import Input from "../common/Input";
import { Button } from "../common/Button";
import Link from "next/link";

export default function LoginForm({onLogin}:{onLogin:(id:string, pw:string)=>void}) {
  // 아이디, 비밀번호 상태 관리
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // 아이디, 비밀번호 변경 함수
  const handleSubmit = (e : FormEvent) => {
    e.preventDefault();
    // 부모컴포넌트에서 전달받는 props
    onLogin(id, pw);
  }
  
  return (
    // 로그인 폼
    <form onSubmit={handleSubmit}>
      <Input label="" type="text" name="id" placeholder="아이디" value={id} onChange={e => setId(e.target.value)}/>
      <Input label="" type="password" name="password" placeholder="비밀번호" value={pw} onChange={e=>setPw(e.target.value)}/>
      {/* 아이디찾기, 비밀번호 찾기, 회원가입으로 이동 */}
      <div>
        <Link href='/find'>아이디 찾기</Link>
        <Link href='/find'>비밀번호 찾기</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
      <Button type="submit" name="login">로그인</Button>
    </form>
  )
}