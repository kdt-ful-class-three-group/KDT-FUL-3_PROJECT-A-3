import styles from './SearchStyles.module.css';

// 나중에 Stock interface 수정
export interface Stock {
  name: string;
  symbol: string;
}

interface Props {
  results: Stock[];
  onSelect: (id: string) => void;
  visible?: boolean;
}

export function SearchDropdown({ results, onSelect, visible }: Props) {
  const dropdownClass = visible ? `${styles.dropdown} ${styles.dropdownVisible}` : styles.dropdown;

  return (
    <ul className={dropdownClass}>
      {results.map((stock) => (
        <li
          key={stock.symbol}
          className={styles.item}
          onClick={() => onSelect(stock.symbol)}
        >
          {stock.name} ({stock.symbol})
        </li>
      ))}
    </ul>
  );
}