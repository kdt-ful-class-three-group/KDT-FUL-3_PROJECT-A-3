import { IdField } from "./fields/IdField"
import { PasswordField } from "./fields/PasswordField"
import { EmailField } from "./fields/EmailField"
import { BirthField } from "./fields/BirthField"
import { Button } from "../common/Button"



export function SignupForm() {

  function signupSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 회원가입 처리 로직
  }


  return (
    <div>
      <form onSubmit={signupSubmit}>
      <IdField />
      <PasswordField />
      <EmailField />
      <BirthField />
        <Button
          name="가입"
          type="submit"
        />
      </form>
    </div>
    
  )
}