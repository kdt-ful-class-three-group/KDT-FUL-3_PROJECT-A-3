import { Input } from '../common/Input';
import styles from './SearchStyles.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
}

export function SearchBar({ value, onChange, onFocus }: Props) {

  
  return (
    <Input
      className={styles.input}
      type="text"
      placeholder="종목명을 입력하세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
    />
  );
}