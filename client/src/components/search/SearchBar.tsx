import { Input } from '../common/Input';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
}

export function SearchBar({ value, onChange, onFocus }: Props) {

  
  return (
    <Input
      className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-600 text-gray-700 placeholder-gray-400 py-2 px-1"
      type="text"
      placeholder="종목명을 입력하세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
    />
  );
}