import { Input } from "@/components/common/Input"
import { useState } from "react"

export function PasswordField({setPassword}: {setPassword: React.Dispatch<React.SetStateAction<string>>}) {

  // 비밀번호 상태 관리
  const [pw, setPw] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  // 메시지
  const [pwError, setPwError] = useState('')
  const [checkError, setCheckError]=useState('')

  // 비밀번호,비밀번호확인 일치확인 로직 추가

  // 영문 숫자 특수문자 포함 8글자 이상 50자 미만
  const checkPw = (pw:string):boolean=>{
    const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/.test(pw);

    return isValid
  }

  // 비밀번호 유효성 검사 -> 상태반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setPw(pw)

    // 유효성 검사
    if(checkPw(pw)){
      setPw(pw);
      setPassword(pw);
      setPwError('')
    }
    else {
      setPwError('8-50자 이내 영문, 숫자, 특수문자 포함해야합니다');
    }
  }

  //비밀번호 확인
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwCheck = e.target.value;
    setPwCheck(pwCheck)

    //일치하는지 확인
    if(pwCheck === pw){
      setCheckError('일치합니다')
    } else {
      setCheckError('비밀번호가 일치하지 않습니다');
    }
  }
  
  
  return (
    <div>
      <Input
        name="password"
        label="비밀번호"
        placeholder="비밀번호"
        value={pw}
        type="password"
        onChange={handleChange}
      />
      {/* 유효성 검사 메시지 */}
      {pwError && <p>{pwError}</p>}
      <Input
        name="password-check"
        label="비밀번호확인"
        placeholder="비밀번호확인"
        type="password"
        value={pwCheck}
        onChange={handleCheck}
      />
      {/* 비밀번호 확인 메시지 */}
      {checkError && <p>{checkError}</p>}
    </div>
  )
}