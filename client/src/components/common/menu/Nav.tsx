'use client'

import { Button } from "../Button"
import { useRouter } from "next/navigation"
import StatusBar from "./StatusBar";
import styles from './Menu.module.css'

export function Nav() {

  const router = useRouter();
  
  return(
    <div className={styles.nav}>
      <div>
        <StatusBar />
      </div>

      <div >
        {/* 검색 페이지 이동*/}
        <Button
          variant="icon"
          icon="search"
          onClick={() => router.push('/search')}
        />
        
        {/* 햄버거 메뉴 */}
        <Button variant="icon" icon="hamburger" onClick={()=>router.push('/hamburger')}/>
      </div>
    </div>
  )
}