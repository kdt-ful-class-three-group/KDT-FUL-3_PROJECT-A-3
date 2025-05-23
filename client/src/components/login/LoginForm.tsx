import { useState } from "react";
import Input from "../common/Input";
import { Button } from "../common/Button";

export default function LoginForm() {
  // 아이디, 비밀번호 상태 관리
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  // 아이디, 비밀번호 변경 함수
  
  return (
    // 로그인 폼
    <form onSubmit={}>
      <Input />
      <Input />
      <Button type="submit">로그인</Button>
    </form>
  )
}