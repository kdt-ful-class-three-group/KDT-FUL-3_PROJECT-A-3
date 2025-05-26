import { Input } from "@/components/common/Input"
import { Select } from "@/components/common/Select";
import { useState, useEffect } from "react";

export function EmailField({setEmail}:{setEmail: React.Dispatch<React.SetStateAction<string>>}) {

  // 상태
  // 이메일
  const [emailId, setEmailId] = useState('')
  // 도메인
  const [emailDomain, setEmailDomain] = useState('')
  // 커스텀 이메일
  const [customEmail, setCustomEmail]= useState('')
  // 메시지
  const [error, setError] = useState('')

  // 이메일 유효성 검사
  const checkEmail = (email:string):boolean => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

    return isValid
  }

  // 값이 주어질 때마다 유효성 검사
  useEffect(()=>{

    //emailId@emailDomain 또는 customEmail값
    
    //유효성 검사에 해당되어야 함


  },[emailId, emailDomain, customEmail])

  const emailDomains = [
    { name: "선택해주세요", value: "" },
    { name: "naver.com", value: "naver.com" },
    { name: "gmail.com", value: "gmail.com" },
    { name: "daum.net", value: "daum.net" },
    { name: "직접입력", value: "custom" },
  ];

  return (
    <div>
      <Input
        type="text"
        name="email"
        label="이메일"
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
        placeholder="example@exam.com"
        value={customEmail}
        onChange={(e) => {setCustomEmail(e.target.value)}}
        disabled={emailDomain !== "custom"}
      />
      {error && <p>{error}</p>}
    </div>
  ) 
}