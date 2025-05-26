'use client'
import { useRouter } from "next/navigation"
import { NameField } from "./fields/NameField"
import { IdField } from "./fields/IdField"
import { PasswordField } from "./fields/PasswordField"
import { EmailField } from "./fields/EmailField"
import { BirthField } from "./fields/BirthField"
import { Button } from "../common/Button"
import { useState } from "react"

export function SignupForm({ onSignup }: { onSignup: (userData: { id: string; password: string; name: string; email: string; birth: string }) => void }) {
  // 회원가입 입력데이터 상태값
  const [userData, setUserData] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
    birth: "",
  })
  

  const router = useRouter()

  function handleChange(field: keyof typeof userData, value: string) {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function signupSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(userData)

    //!회원가입 처리 로직
    onSignup(userData);

  }

  return (
    <div>
      <form onSubmit={signupSubmit}>
        <IdField value={userData.id} onChange={(e) => handleChange("id", e.target.value)} />
        <PasswordField value={userData.password} onChange={(e) => handleChange("password", e.target.value)} />
        <NameField value={userData.name} onChange={(e) => handleChange("name", e.target.value)} />
        <EmailField value={userData.email} onChange={(val) => handleChange("email", val)} />
        <BirthField value={userData.birth} onChange={(val) => handleChange("birth", val)} />
        <Button name="가입" type="submit" />
      </form>
    </div>
  )
}