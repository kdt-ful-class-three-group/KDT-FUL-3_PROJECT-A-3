import { Input } from "@/components/common/Input"
import { Button } from "@/components/common/Button"
import { InputProps } from "@/components/common/Input"

export function IdField({ value, onChange }: InputProps) {
  // 아이디중복체크 이벤트
  const IdCheck = () => {
    console.log('아이디 중복체크 로직')
  }

  return (
    <div>
      <Input 
        name="id"
        label="아이디"
        placeholder="아이디"
        value={value}
        onChange={onChange}
      />
      <Button
        name="중복확인"
        onClick={IdCheck}
      /> 
    </div>
  ) 
}