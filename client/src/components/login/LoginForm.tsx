import { useState, FormEvent } from "react";
import Input from "../common/Input";
import { Button } from "../common/Button";

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
      <Button type="submit" name="login">로그인</Button>
    </form>
  )
}