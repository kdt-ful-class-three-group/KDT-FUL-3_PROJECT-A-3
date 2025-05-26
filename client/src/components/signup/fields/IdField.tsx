import { Input } from "@/components/common/Input"
import { Button } from "@/components/common/Button"
import { useState } from "react"
import { InputProps } from "@/components/common/Input"

export function IdField({value, onChange}: InputProps) {
  // 상태 관련 메시지
  const [error, setError] = useState('')

  //아이디 유효성 검사 - 4글자 이상 특수문자 안됨 12글자 미만
  const checkId = (text:string):boolean=>{
    const isValid = /^[a-zA-Z0-9]{4,12}$/.test(text);

    return isValid;
  }
  
  //유효성 검사 통과 -> 상태 반영
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    //유효한 글자만 남기기
    const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
    //12글자 이상일 경우 자르기
    const slicedText = filteredText.slice(0, 12);

    // 유효성 검사
    if(!checkId(slicedText)){
      setError('4-12자 이내 영문, 숫자만 가능합니다');
    }
    else {
      setError('')
    }

    // 부모에게 전달 - replace와 slice 적용시키기
    const filteringEvent = {...e, target:{...e.target, value: slicedText}}
    onChange?.(filteringEvent)
  }

  // Button onClick 이벤트 추가
  const submitId=(e:React.MouseEvent)=>{
    e.preventDefault();

    console.log("아이디 중복확인 버튼 클릭");
    //중복확인 로직


  }

  return (
    <div>
      <Input 
        name="id"
        label="아이디"
        placeholder="아이디"
        value={value}
        onChange={handleChange}
      />
      {/* 유효성 검사 메시지 */}
      {error && <p>{error}</p>}
      <Button
        name="중복확인"
        onClick={submitId}
      /> 
    </div>
  ) 
}