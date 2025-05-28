import { useEffect } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

import styles from './SearchBar.module.css'
interface SearchBarProps {
  onClose: () => void;
}

export function StockSearch({ onClose }: SearchBarProps) {

  useEffect(() => {
    // search 화면 나왔을 때 배경 스크롤 방지
    document.body.style.overflow = 'hidden';
    // search 화면 사라질 때 원래대로 복구
    return () => { document.body.style.overflow = 'auto'; };
  }, []);


  return (

    // 홈 검색 창 스타일. 모듈에 있으니 나중에 수정할 때 참고할것.
    <div className={styles.overlay}>

      <div>
        <Button
          name="닫기"
          onClick={onClose}
        />
      </div>
      
      <div>
        <Input
          type="text"
        />
      </div>

      <div>
        {/* 여기에 인기 주식 리스트나 실시간 인기 검색어 등등 추가하면 될듯 */}
      </div>

    </div>
  )
}