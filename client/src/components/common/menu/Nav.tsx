'use client'

import { Button } from "../Button"
import { useRouter } from "next/navigation"

export function Nav() {

  const router = useRouter();
  
  return(
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div>
        <p>온도 체크</p>
      </div>

      <div >
        {/* 검색 페이지 이동*/}
        <Button
          variant="icon"
          icon="search"
          onClick={() => router.push('/search')}
        />
        
        {/* 햄버거 메뉴 */}
        <Button variant="icon" icon="hamburger" />
      </div>
    </div>
  )
}