import { Select } from "@/components/common/Select";
import { useEffect, useState } from "react";

interface BirthFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
}

export function BirthField({ value , onChange, onValidChange }: BirthFieldProps) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  //메시지
  const [error, setError] = useState('')


  //Select option 년월일 배열들
  const currentYear = new Date().getFullYear();
  const years = ["", ...Array.from({ length: 100 }, (_, i) => (currentYear - i).toString())];
  const months = ["", ...Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))];
  const days = ["", ...Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))];

  // value 바뀔때 Select 초기화
  useEffect(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-");
      if (y !== year || m !== month || d !== day) {
        setYear(y);
        setMonth(m);
        setDay(d);
      }
    }
  }, [value]);

  // 년/월/일 모두 선택되면 부모로 전달
  useEffect(() => {
    if (year && month && day) {
      onChange?.(`${year}-${month}-${day}`);
      setError('')
      onValidChange?.(true);
    } else {
      setError('생년월일을 모두 선택해주세요.')
      onValidChange?.(false);
    }
  }, [year, month, day]);


  return (
    <div>
      <div>
        <label htmlFor="birth" className="text-sm">생년월일</label>
        <div className="flex w-full gap-5">
          <Select
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            option={years.map((y) => ({ name: y === "" ? "년" : y, value: y }))}
            className="p-2 border-2 rounded border-[#B0DB9C]/30 w-1/3"
          />
          <Select
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            option={months.map((m) => ({ name: m === "" ? "월" : m, value: m }))}
            className="p-2 border-2 rounded border-[#B0DB9C]/30 w-1/3"
          />
          <Select
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            option={days.map((d) => ({ name: d === "" ? "일" : d, value: d }))}
            className="p-2 border-2 rounded border-[#B0DB9C]/30 w-1/3"
          />

        </div>
      </div>
      {/* 에러 메시지 */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}