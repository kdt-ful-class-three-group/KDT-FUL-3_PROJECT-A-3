import { Input } from "@/components/common/Input"
import { Select } from "@/components/common/Select";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import axios from "axios";
import { EmailVerification } from "./EmailVerification";

// 기존 inputProps 사용하려했는데 안되겠어.
interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
}

// 예시 주소 도메인들. 필요하면 여기 추가. 도메인 따로 파일로 빼서 사용할생각도 해보겠음.
const emailDomains = [
  { name: "선택해주세요", value: "" },
  { name: "naver.com", value: "naver.com" },
  { name: "gmail.com", value: "gmail.com" },
  { name: "daum.net", value: "daum.net" },
  { name: "직접입력", value: "custom" },
];

export function EmailField({ value, onChange, onValidChange }: EmailFieldProps) {

  // 상태
  // 이메일
  const [emailId, setEmailId] = useState('')
  // 도메인
  const [emailDomain, setEmailDomain] = useState('')
  // 커스텀 이메일
  const [customEmail, setCustomEmail] = useState('')
  // 메시지
  const [error, setError] = useState('')

  //최종 이메일
  const fullEmail = (): string => {
    // custom일때
    if (emailDomain === 'custom') return `${emailId}@${customEmail}`;
    // 값이 없을 때
    if (!emailDomain) return '';
    // 값이 있을때
    return `${emailId}@${emailDomain}`;
  }

  // 이메일 유효성 검사
  const checkEmail = (email: string): boolean => {
    // const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  }

  // 값이 주어질 때마다 유효성 검사
  useEffect(() => {
    //emailId@emailDomain 또는 customEmail값
    const email = fullEmail();

    if (!emailId || (!emailDomain && !customEmail)) {
      onChange('') // 이메일이 비어있거나 도메인이 선택되지 않은 경우
      setError('') // 에러 메시지 초기화
      onValidChange?.(false) // 유효성 검사 실패
      return;
    }
    //유효성 검사에 해당되어야 함
    if (checkEmail(email)) {
      onChange(email)
      setError('중복확인을 해주세요')
      onValidChange?.(true) // 유효성 검사 성공
    } else {
      onChange('')
      setError('유효하지 않은 이메일 형식입니다')
      onValidChange?.(false) // 유효성 검사 실패
    }
  }, [emailId, emailDomain, customEmail])


  // const isDisabled = !emailId || (!emailDomain && !customEmail) || !checkEmail(fullEmail());


  //*  이메일 중복확인 버튼 클릭 이벤트
  const submitEmail = async (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("아이디 중복확인 버튼 클릭");
    //!중복확인 로직

    try {
      const res = await axios.post('http://localhost:8008/auth/emailCheck', { email: value });

      if (res.status === 201) {
        setError('사용 가능한 이메일입니다.');
      } else {
        // setError('알 수 없는 오류가 발생했습니다.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setError('이미 사용 중인 이메일입니다.');
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    }
  }

  return (
    <div className="w-full">
      <p className="text-sm">이메일</p>
      <div className="flex gap-2 flex-wrap">
        <Input
          name="emailLocal"
          placeholder="이메일"
          value={emailId}
          onChange={(e) => { setEmailId(e.target.value) }}
          className="p-2 bg-[#B0DB9C]/30 rounded"
        />


        <div className="flex gap-2 items-center">
          <p className="font-bold">@</p>
        
          {emailDomain!=='custom' ?(

            <Select
              name="emailDomain"
              option={emailDomains}
              value={emailDomain}
              onChange={(e) => { setEmailDomain(e.target.value) }}
              className="p-2 border-2 rounded border-[#B0DB9C]/30"
            />
          ) :
            <Input
              type="text"
              label=""
              value={customEmail}
              onChange={(e) => { setCustomEmail(e.target.value) }}
              disabled={emailDomain !== "custom"}
              name="customDomain"
              placeholder="직접 입력"
              className="p-2 bg-[#B0DB9C]/30 rounded"
            />
          }
        </div>
      </div>

      {error && <p className="text-sm text-red-500 ml-1">{error}</p>}
      
      <Button
        name="중복확인"
        type="button"
        onClick={submitEmail}
        className="cursor-pointer 
         bg-[#B0DB9C] rounded p-2 w-full mt-2 mb-2"
      />
      {/* 이메일 인증코드 발급/검증 */}
      <EmailVerification
        email={fullEmail()}
        onValidChange={onValidChange}
      />
    </div>
  );
}