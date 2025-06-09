import { Input } from "@/components/common/Input"
import { useState } from "react"
import { InputProps } from "@/components/common/Input"



export function NameField({value, onChange, onValidChange}: InputProps) {
  // 상태 관련 메시지
  const [error, setError] = useState('')

  // 이름 유효성 검사 - 2글자 이상 20글자 이하 한글, 영문, 숫자만 허용
  const checkName = (text: string): boolean => {
    // const isValid = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,20}$/.test(text);
    return /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,20}$/.test(text);
  }
  // 유효성 검사 통과 -> 상태 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    // 유효한 글자만 남기기
    const filteredText = text.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, '');
    // 10글자 이상일 경우 자르기
    const slicedText = filteredText.slice(0, 10);

    const valid = checkName(slicedText)

    // 유효성 검사
    const isValid = checkName(slicedText);
    if (!isValid) {
      setError('2-10자 이내 한글, 영문만 가능합니다');
    } else {
      setError('');
    }
    onValidChange?.(isValid);

    // 부모에게 전달 - replace와 slice 적용시키기
    const filteringEvent = { ...e, target: { ...e.target, value: slicedText } };
    onChange?.(filteringEvent as React.ChangeEvent<HTMLInputElement>);
  }

 
  return (
    <div>
      <p className="text-sm">이름</p>
      <Input 
        name="name"
        // label="이름"
        placeholder="이름"
        value={value}
        onChange={handleChange}
        className="w-full p-2 bg-[#B0DB9C]/30 rounded"
      />
      {/* 유효성 검사 메시지 */}
      {error && <p className="text-sm text-red-500 ml-1">{error}</p>}
    </div>
  ) 
}