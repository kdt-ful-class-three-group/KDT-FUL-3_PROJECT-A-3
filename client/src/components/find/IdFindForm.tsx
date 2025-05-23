import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";


export function IdFindForm() {
  return (
    <div>
      {/* <form onSubmit={() => { }}> */}
      <form>
      <Input
        label="생년월일"
        name="생년월일"
        placeholder="생년월일 8자리 YYYYMMDD"
      />
      <Input
        label="이메일"
        name=""
        />
      <Button
        name="확인"
        // type="submit"
      />
    </form>
    </div>
  )
}