import { IdField } from "./fields/IdField"
import { PasswordField } from "./fields/PasswordField"
import { EmailField } from "./fields/EmailField"
import { BirthField } from "./fields/BirthField"
import { Button } from "../common/Button"
import { useEffect, useState } from "react"



export function SignupForm() {

  function signupSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 회원가입 처리 로직
  }

  // 유효성
  // 아이디 - 4글자 이상 특수문자 안됨 12글자 미만
  const [id, setId] = useState('');
  // 비밀번호 - 영문 숫자 특수문자 포함 8글자 이상 50자 미만
  const [password, setPassword] = useState('');
  // 이메일 - 형식 맞추기
  const [email, setEmail] = useState('');
  // 생년월일 - 생년월일 제한
  const [birth, setBirth] = useState('');

  useEffect(()=>{
    console.log(id)
  },[id])

  return (
    <div>
      <form onSubmit={signupSubmit}>
      <IdField setId={setId}/>
      <PasswordField />
      <EmailField />
      <BirthField />
        <Button
          name="가입"
          type="submit"
        />
      </form>
    </div>
    
  )
}