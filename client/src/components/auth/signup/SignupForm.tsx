'use client'
import { useRouter } from "next/navigation"
import { NameField } from "./fields/NameField"
import { IdField } from "./fields/IdField"
import { PasswordField } from "./fields/PasswordField"
import { EmailField } from "./fields/EmailField"
import { BirthField } from "./fields/BirthField"
import { Button } from "@/components/common/Button"
import { useState } from "react"

// RTK
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setField } from "@/store/slices/signupSlice"

export function SignupForm({ onSignup }: { onSignup: (userData: { id: string; password: string; name: string; email: string; birth: string }) => void }) {
  const router = useRouter();
  //* Redux의 액션을 보낼 수 있게 준비하는 훅
  const dispatch = useDispatch()
  //* 전역 상태에서 상태 가져오기 -> 다른 컴포넌트에서 공유 가능
  const {id, password, name, email, birth} = useSelector((state:RootState)=> state.signup)

  //유효성 상태값
  const [idValid, setIdValid] = useState(false)
  const [pwValid, setPwValid] = useState(false)
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [birthValid, setBirthValid] = useState(false)
  //최종
  const isFormValid = idValid && pwValid && nameValid && emailValid && birthValid

  //* 상태 업데이트
  function handleChange(field: 'id'|'password'|'name'|'email'|'birth', value: string) {
    dispatch(setField({field,value}))
  }

  function signupSubmit(e: React.FormEvent) {
    e.preventDefault();


    //!회원가입 처리 로직
    
    if (!isFormValid) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }
    onSignup({id, password, name, email, birth});
  }

  return (
    <div>
      <form onSubmit={signupSubmit} className="flex flex-col gap-5">
        <IdField
          value={id}
          onChange={(e) => handleChange("id", e.target.value)}
          onValidChange={setIdValid}
        />
        <PasswordField value={password}
          onChange={(e) => handleChange("password", e.target.value)}
          onValidChange={setPwValid}
        />
        <NameField value={name} onChange={(e) => handleChange("name", e.target.value)}
          onValidChange={setNameValid}
        />
        <EmailField
          value={email}
          onChange={(val) => handleChange("email", val)}
          onValidChange={setEmailValid}
        />
        <BirthField
          value={birth}
          onChange={(val) => handleChange("birth", val)}
          onValidChange={setBirthValid}
        />
        <Button name="가입"
          type="submit"
          onClick={()=> router.push('/login')}
          disabled={!isFormValid} />
      </form>
    </div>
  )
}