'use client'
import { IdField } from "./fields/IdField"
import { PasswordField } from "./fields/PasswordField"
import { EmailField } from "./fields/EmailField"
import { BirthField } from "./fields/BirthField"
import { Button } from "../common/Button"
import { useState } from "react"

//*RTK
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setField } from "@/store/signupSlice"

export function SignupForm() {
  // // 회원가입 입력데이터 상태값
  // const [userData, setUserData] = useState({
  //   id: "",
  //   password: "",
  //   email: "",
  //   birth: "",
  // })

  // *RTK
  const dispatch = useDispatch()
  const userData = useSelector((state:RootState)=> state.signup)
  
  function handleChange(field: keyof typeof userData, value: string) {
    dispatch(setField({field,value}))
  }

  function signupSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(userData)

    //!회원가입 처리 로직
    // 모두 값이 유효해야 버튼 클릭 가능

  }

  return (
    <div>
      <form onSubmit={signupSubmit}>
        <IdField value={userData.id} onChange={(e) => handleChange("id", e.target.value)} />
        <PasswordField value={userData.password} onChange={(e) => handleChange("password", e.target.value)} />
        <EmailField value={userData.email} onChange={(val) => handleChange("email", val)} />
        <BirthField value={userData.birth} onChange={(val) => handleChange("birth", val)} />
        <Button name="가입" type="submit" />
      </form>
    </div>
  )
}