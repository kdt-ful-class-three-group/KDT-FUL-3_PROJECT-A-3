import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

export function PwFindForm() {
  return (
    <div>
      {/* <form onSubmit={() => { }}> */}
      <form>
        <Input
          label="아이디"
          name="id"
          placeholder="아이디"
        />
        <Input
          label="이메일"
          name="email"
          placeholder="이메일"
        />
        <div>
          <Input
            label="인증번호 입력"
            name="verificationCode"
            placeholder="인증번호"
          />
          <Button
            type="button"
            onClick={() => { }}
            name="인증번호 전송"
          />
          
        </div>
        <Button
          // type="submit"
          name="확인"
        />
      </form>
    </div>
  );
}