import styles from './SearchStyles.module.css';

// 나중에 Stock interface 수정
interface Stock {
  id: string;
  name: string;
  symbol: string;
}

interface Props {
  results: Stock[];
  onSelect: (id: string) => void;
}

export function SearchDropdown({ results, onSelect }: Props) {
  return (
    <ul className={styles.dropdown}>
      {results.map((stock) => (
        <li
          key={stock.id}
          className={styles.item}
          onClick={() => onSelect(stock.id)}
        >
          {stock.name} ({stock.symbol})
        </li>
      ))}
    </ul>
  );
}