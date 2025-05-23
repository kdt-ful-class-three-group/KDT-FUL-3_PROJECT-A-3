import { Input } from "@/components/common/Input"


export function BirthField() {
  return (
    <div>
      <Input
        name="birth"
        label="생년월일"
        type="date"
      />
    </div>
  );
}