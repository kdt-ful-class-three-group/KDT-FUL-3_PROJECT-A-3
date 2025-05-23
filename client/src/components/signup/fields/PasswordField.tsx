import { Input } from "@/components/common/Input"
import { useState } from "react"

export function PasswordField({setPassword}: {setPassword: React.Dispatch<React.SetStateAction<string>>}) {

  // 비밀번호 상태 관리
  const [pw, setPw] = useState('')
  const [pwCheck, setPwCheck] = useState('')

  // 비밀번호,비밀번호확인 일치확인 로직 추가

  // 영문 숫자 특수문자 포함 8글자 이상 50자 미만
  const checkPw = (pw:string):boolean=>{
    const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/.test(pw);

    return isValid
  }
  
  
  return (
    <div>
      <Input
        name="password"
        label="비밀번호"
        placeholder="비밀번호"
        value={pw}
        type="password"
        onChange={()=>{}}
      />
      <Input
        name="password-check"
        label="비밀번호확인"
        placeholder="비밀번호확인"
        type="passowrd"
        value={pwCheck}
        onChange={()=>{}}
      />
    </div>
  )
}