'use client'

import { useState } from "react"
import { Button } from "../Button"
import { StockSearch } from "@/components/search/StockSearch";

export function Nav() {

  const [showSearch, setShowSearch] = useState(false);
  
  return(
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div>
        <p>온도 체크</p>
      </div>

      <div >
        {/* 검색 메뉴 */}
        <Button
          variant="icon"
          icon="search"
          onClick={() => setShowSearch(true)}
        />
        {showSearch && <StockSearch onClose={() => setShowSearch(false)} />}


        {/* 알림메뉴 */}
        <Button variant="icon" icon="hamburger" />
      </div>
    </div>
  )
}