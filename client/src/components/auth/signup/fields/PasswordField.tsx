import { Input, InputProps } from "@/components/common/Input"
import { useState } from "react"

export function PasswordField({value, onChange, onValidChange}: InputProps) {
  // 비밀번호 - value
  // 비밀번호 확인 - pwCheck
  const [pwCheck, setPwCheck] = useState('')
  // 비밀번호 유효성 메시지
  const [pwError, setPwError] = useState('')
  // 비밀번호 확인 메시지
  const [checkError, setCheckError]=useState('')


  // 유효성 - 영문 숫자 특수문자 포함 8글자 이상 50자 미만
  const checkPw = (pw:string):boolean=>{
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/.test(pw);
  }

  // 비밀번호 유효성 검사 -> 상태반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    // const isValid = checkPw(pw)&& pwCheck.length > 0; // pw 유효성 검사
    const isPwValid = checkPw(pw); // pw 유효성 검사

    console.log(pw)
    
    // 입력값이 없을 때
    if(pw.length === 0 ){
      setPwError('비밀번호를 입력해주세요')
    }
    // 입력값 있음 + 유효성 검사
    else if(!isPwValid){
        setPwError('8-50자 이내 영문, 숫자, 특수문자 포함해야합니다');  
    } 
    else {
        setPwError('')
    }

    //비밀번호 확인 값과 비교
    if(pwCheck.length===0){
      setCheckError('동일한 비밀번호를 입력해주세요')
    }
    else if(pw===pwCheck){
      setCheckError('일치합니다')
    }
    else {
      setCheckError('일치하지 않습니다')
    }

    onValidChange?.(isPwValid && pwCheck===pw &&pwCheck.length>0);
    onChange?.(e);
  }

  //비밀번호 확인
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwCheckValue = e.target.value;
    setPwCheck(pwCheckValue)

    //비밀번호 확인
    if(pwCheckValue.length===0){
      setCheckError('동일한 비밀번호를 입력해주세요')
    }
    else if(pwCheckValue===value && checkPw(value)){
      setCheckError('일치합니다')
    }
    else{
      setCheckError('일치하지 않습니다')
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