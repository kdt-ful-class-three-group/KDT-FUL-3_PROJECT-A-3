import { Input } from "../common/Input";

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