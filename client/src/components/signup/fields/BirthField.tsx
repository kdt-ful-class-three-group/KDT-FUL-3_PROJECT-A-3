import { Input } from "@/components/common/Input"
import { InputProps } from "@/components/common/Input";

export function BirthField({ value, onChange }: InputProps) {
  
  return (
    <div>
      <Input
        name="birth"
        label="생년월일"
        type="date"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}