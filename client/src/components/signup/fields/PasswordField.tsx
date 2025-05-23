import { useState } from "react";
import { Input } from "@/components/common/Input";
import { InputProps } from "@/components/common/Input";

// Input 인터페이스에 타입 추가


export function PasswordField({ value, onChange }: InputProps) {
  const [passwordCheck, setPasswordCheck] = useState("");

  // 비밀번호 체크 확인
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  return (
    <div>
      <Input
        name="password"
        label="비밀번호"
        placeholder="비밀번호"
        type="password"
        value={value}
        onChange={onChange}
      />
      <Input
        name="password-check"
        label="비밀번호확인"
        placeholder="비밀번호확인"
        type="password"
        value={passwordCheck}
        onChange={handlePasswordCheck}
      />
    </div>
  );
}