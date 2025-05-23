import { Input } from "@/components/common/Input"


export function BirthField({setBirth}:{setBirth: React.Dispatch<React.SetStateAction<string>>}) {
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