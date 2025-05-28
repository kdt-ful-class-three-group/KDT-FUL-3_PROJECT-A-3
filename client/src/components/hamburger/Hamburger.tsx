import { Button } from "../common/Button"
import { useEffect } from "react";
import styles from './Hamburger.module.css'

type props = {
  onClose : ()=>void
}

export function Hamburger({onClose}:props){

  useEffect(() => {
      // search 화면 나왔을 때 배경 스크롤 방지
      document.body.style.overflow = 'hidden';
      // search 화면 사라질 때 원래대로 복구
      return () => { document.body.style.overflow = 'auto'; };
    }, []);

  // ! 마이페이지 이동 & 로그아웃 기능 추가

  return(
    <div className={styles.overlay}>
      <Button variant="icon" icon="close" onClick={onClose}/>
      <div>
        <p>마이페이지</p>
      </div>
      <div>
        <p>로그아웃</p>
      </div>
    </div>
  )
}