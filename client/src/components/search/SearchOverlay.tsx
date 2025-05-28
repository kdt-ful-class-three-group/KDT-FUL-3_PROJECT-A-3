import { useEffect } from "react";
import { Button } from "../common/Button";
import styles from './SearchStyles.module.css'

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export function SearchOverlay({ onClose, children }: Props) {
  
  useEffect(() => {
    // 검색 페이지 숨김
    document.body.style.overflow = 'hidden';
    // 검색 페이지 출력
    return () => { document.body.style.overflow = 'auto' };
  }, []);

  return (
    <div className={styles.overlay}>
      <div>
        <Button name="닫기" onClick={onClose} />
      </div>
      <div>
      {children}
      </div>
    </div>
  )
}