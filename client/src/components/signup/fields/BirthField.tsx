import { useState } from "react"
import { Input } from "@/components/common/Input"


export function BirthField() {
  const [birth, setBirth] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value; // YYYY-MM-DD
    const formatted = raw.replaceAll("-", ""); // YYYYMMDD
    setBirth(formatted);
  };

  return (
    <div>
      <Input
        name="birth"
        label="생년월일"
        type="date"
        onChange={handleChange}
      />
    </div>
  );
}