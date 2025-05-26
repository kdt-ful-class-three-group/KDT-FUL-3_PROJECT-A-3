import { Input } from "@/components/common/Input"
import { Select } from "@/components/common/Select";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";

// 기존 inputProps 사용하려했는데 안되겠어.
interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

// 예시 주소 도메인들. 필요하면 여기 추가. 도메인 따로 파일로 빼서 사용할생각도 해보겠음.
const emailDomains = [
  { name: "선택해주세요", value: "" },
  { name: "naver.com", value: "naver.com" },
  { name: "gmail.com", value: "gmail.com" },
  { name: "daum.net", value: "daum.net" },
  { name: "직접입력", value: "custom" },
];

export function EmailField({value, onChange}: EmailFieldProps) {

  // 상태
  // 이메일
  const [emailId, setEmailId] = useState('')
  // 도메인
  const [emailDomain, setEmailDomain] = useState('')
  // 커스텀 이메일
  const [customEmail, setCustomEmail]= useState('')
  // 메시지
  const [error, setError] = useState('')

  //최종 이메일
  const fullEmail = ():string =>{
    // custom일때
    if(emailDomain === 'custom') return `${emailId}@${customEmail}`
    // 값이 없을 때
    if(!emailDomain) return ''
    // 값이 있을때
    return `${emailId}@${emailDomain}`
  }

  // 이메일 유효성 검사
  const checkEmail = (email:string):boolean => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

    return isValid
  }

  // 값이 주어질 때마다 유효성 검사
  useEffect(()=>{

    //emailId@emailDomain 또는 customEmail값
    const email = fullEmail();

    if(!emailId || (!emailDomain && !customEmail)){
      onChange('') // 이메일이 비어있거나 도메인이 선택되지 않은 경우
      setError('이메일을 입력해주세요') // 에러 메시지 초기화
      return
    }
    
      //유효성 검사에 해당되어야 함
      if(checkEmail(email)){
        // setEmail(email)
        onChange(email)
        setError('사용가능한 이메일입니다')
      } else {
        // setEmail('')
        onChange('')
        setError('유효하지 않은 이메일 형식입니다')
      }


  },[emailId, emailDomain, customEmail])




  return (
    <div>
      <Input
        name="emailLocal"
        placeholder="이메일"
        value={emailId}
        onChange={(e) => {setEmailId(e.target.value) }}
      />

      <span>@</span>

      <Select
        name="emailDomain"
        option={emailDomains}
        value={emailDomain}
        onChange={(e) => {setEmailDomain(e.target.value)}}
      />
      <Input
        type="text"
        label=""
        value={customEmail}
        onChange={(e) => {setCustomEmail(e.target.value)}}
        disabled={emailDomain !== "custom"}
        name="customDomain"
        placeholder="직접 입력"
      />
      {error && <p>{error}</p>}
    </div>
  );
}