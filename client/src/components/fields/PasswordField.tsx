import { Input } from "../common/Input"

export function PasswordField() {

  // 비밀번호,비밀번호확인 일치확인 로직 추가

  return (
    <div>
      <Input
        name="password"
        label="비밀번호"
        placeholder="비밀번호"
        type="password"
      />
      <Input
        name="password-check"
        label="비밀번호확인"
        placeholder="비밀번호확인"
        type="passowrd"
      />
    </div>
  )
}