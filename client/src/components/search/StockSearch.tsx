import { useEffect } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

// 타입 - onClose 함수
type Props = {
  onClose: () => void;
};

export function StockSearch({ onClose }: Props) {


  useEffect(() => {
    // search 화면 나왔을 때 배경 스크롤 방지
    document.body.style.overflow = 'hidden';
    // search 화면 사라질 때 원래대로 복구
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (

    // 홈 검색 창 나중에 스타일 수정
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255,255,255,0.95)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
    }}>

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
    </div>
  )
}