import { Input, InputProps } from "@/components/common/Input"
import { useState } from "react"

export function PasswordField({value, onChange, onValidChange}: InputProps) {
  // 비밀번호 상태 관리
  const [pwCheck, setPwCheck] = useState('')
  // 메시지
  const [pwError, setPwError] = useState('')
  const [checkError, setCheckError]=useState('')

  // 비밀번호,비밀번호확인 일치확인 로직 추가

  // 영문 숫자 특수문자 포함 8글자 이상 50자 미만
  const checkPw = (pw:string):boolean=>{
    // const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/.test(pw);
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/.test(pw);
  }

  // 비밀번호 유효성 검사 -> 상태반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    const isValid = checkPw(pw)&& pwCheck.length > 0 && pwCheck === pw;
    
    // 유효성 검사
    if (!isValid)
      setPwError('8-50자 이내 영문, 숫자, 특수문자 포함해야합니다');
    else {
      setPwError('')
    }

        //비밀번호 확인 값이 있으면 일치 여부 
    if(pwCheck.length>0 && pwCheck===pw){
      setCheckError('일치합니다')
    } else {
      setCheckError('비밀번호가 일치하지 않습니다')
    }

    onValidChange?.(isValid);
    onChange?.(e);
  }

  //비밀번호 확인
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwCheck = e.target.value;
    setPwCheck(pwCheck)

    //일치하는지 확인
    if(pwCheck ===value){
      setCheckError('일치합니다')
    } 
    if(pwCheck!==value || pwCheck.length===0){
      setCheckError('비밀번호가 일치하지 않습니다');
    }
  }
  
  
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm">비밀번호</p>
        <Input
          name="password"
          // label="비밀번호"
          placeholder="비밀번호"
          value={value}
          type="password"
          onChange={handleChange}
          className="w-full p-2 bg-[#B0DB9C]/30 rounded"
        />
        {/* 유효성 검사 메시지 */}
        {pwError && <p className="text-sm text-red-500 ml-1">{pwError}</p>}
      </div>
      <div>
        <p className="text-sm">비밀번호 확인</p>
        <Input
          name="password-check"
          // label="비밀번호확인"
          placeholder="비밀번호확인"
          type="password"
          value={pwCheck}
          onChange={handleCheck}
           className="w-full p-2 bg-[#B0DB9C]/30 rounded"
        />
        {/* 비밀번호 확인 메시지 */}
        {checkError && <p className="text-sm text-red-500 ml-1">{checkError}</p>}

      </div>
    </div>
  );
}