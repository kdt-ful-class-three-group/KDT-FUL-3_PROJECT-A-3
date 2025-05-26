import { Input } from "@/components/common/Input"
import { Select } from "@/components/common/Select";
import { useState } from "react";

export function EmailField({setEmail}:{setEmail: React.Dispatch<React.SetStateAction<string>>}) {

  // 상태
  // 이메일
  const [emailId, setEmailId] = useState('')
  // 도메인
  const [emailDomain, setEmailDomain] = useState('')
  // 메시지
  const [error, setError] = useState('')

  // 이메일 유효성 검사
  const checkEmail = (email:string):boolean => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

    return isValid
  }

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
        onChange={() => { }}
      />
      <span>@</span>
      <Select
        name="emailDomain"
        option={emailDomains}
        value={emailDomain}
        onChange={() => { }}
      />
      <Input
        type="text"
        label=""
        placeholder="example@exam.com"
      />
      {error && <p>{error}</p>}
    </div>
  ) 
}