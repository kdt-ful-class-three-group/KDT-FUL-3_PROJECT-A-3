import { Input } from "@/components/common/Input"
import { Select } from "@/components/common/Select";

export function EmailField() {

  const emailDomains = [
    { name: "선택해주세요", value: "" },
    { name: "naver.com", value: "naver.com" },
    { name: "gmail.com", value: "gmail.com" },
    { name: "daum.net", value: "daum.net" },
    { name: "직접입력", value: "custom" },
  ];

  return (
    <div>
      <Input
        type="text"
        name="email"
        label="이메일"
        placeholder="이메일"
        onChange={() => { }}
      />
      <span>@</span>
      <Select
        name="emailDomain"
        option={emailDomains}
        onChange={() => { }}
      />
      <Input
        type="text"
        label=""
        placeholder="example@exam.com"
      />
    </div>
  ) 
}