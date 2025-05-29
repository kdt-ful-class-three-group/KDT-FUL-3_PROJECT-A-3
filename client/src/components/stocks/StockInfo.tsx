import { StockInfoProps } from "@/types/stock";
import { getKoreanSymbol } from "./StockList";
import styles from './StockStyles.module.css'

export function StockInfo({ symbol, price }: StockInfoProps) {

  const koSymbol = getKoreanSymbol(symbol);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h1>{koSymbol} ({symbol})</h1>
        <span>{price ?? "정보 없음"}</span>
      </div>
    </div>
  );
}