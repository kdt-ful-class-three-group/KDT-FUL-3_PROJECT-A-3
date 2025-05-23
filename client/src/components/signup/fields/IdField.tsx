import { Input } from "@/components/common/Input"
import { Button } from "@/components/common/Button"

export function IdField() {

  // Button onClick 이벤트 추가

  return (
    <div>
      <Input 
        name="id"
        label="아이디"
        placeholder="아이디"
        onChange={() => { }}
      />
      <Button
        name="중복확인"
        onClick={() => { }}
      /> 
    </div>
  ) 
}