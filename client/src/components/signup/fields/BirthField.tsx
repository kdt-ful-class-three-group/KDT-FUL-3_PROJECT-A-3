import { Select } from "@/components/common/Select";
import { useEffect, useState } from "react";

interface BirthFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function BirthField({ value , onChange }: BirthFieldProps) {
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
    } else {
      setError('생년월일을 모두 선택해주세요.')
    }
  }, [year, month, day]);


  return (
    <div>
      <div>
        <label htmlFor="birth">생년월일</label>
        <Select
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          option={years.map((y) => ({ name: y === "" ? "년" : y, value: y }))}
        />
        <Select
          name="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          option={months.map((m) => ({ name: m === "" ? "월" : m, value: m }))}
        />
        <Select
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          option={days.map((d) => ({ name: d === "" ? "일" : d, value: d }))}
        />
      </div>
      {/* 에러 메시지 */}
      {error && <p>{error}</p>}
    </div>
  );
}