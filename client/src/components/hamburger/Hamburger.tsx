import { Button } from "../common/Button"
import { useEffect } from "react";
import styles from './Hamburger.module.css'
import axios from "axios";

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
        <p className={styles.cursor} onClick={() => {
                  axios.post(
      'http://localhost:8008/auth/logout',
      {}, // body
      { withCredentials: true } // config
    ).then(() => {
      console.log("로그아웃 요청 성공");
      // 예: 페이지 이동이나 상태 초기화 등 추가 처리
      window.location.href = 'login'
    }).catch(err => {
      console.error("로그아웃 실패", err);
    });
  }}>로그아웃</p>
      </div>
    </div>
  )
}