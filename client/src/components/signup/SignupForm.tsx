import { IdField } from "./fields/IdField"
import { PasswordField } from "./fields/PasswordField"
import { EmailField } from "./fields/EmailField"
import { BirthField } from "./fields/BirthField"
import { Button } from "../common/Button"
import { useState } from "react"

export function SignupForm() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [birth, setBirth] = useState("")

  function signupSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(id,password,birth,email)

    // 회원가입 처리 로직

  }


  return (
    <div>
      <form onSubmit={signupSubmit}>
        <IdField value={id} onChange={(e) => setId(e.target.value)}/>
        <PasswordField value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <EmailField value={email} onChange={setEmail} />
        <BirthField value={birth} onChange={(e)=> setBirth(e.target.value)}/>
        <Button
          name="가입"
          type="submit"
        />
      </form>
    </div>
    
  )
}