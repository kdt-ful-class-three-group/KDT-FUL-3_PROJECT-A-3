import { Button } from "../Button"

export function Nav() {
  
  return(
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div>
        <p>온도 체크</p>
      </div>

      <div >
        {/* 검색 메뉴 */}
        <Button variant="icon" icon="search" />
        {/* 알림메뉴 */}
        <Button variant="icon" icon="hamburger" />
      </div>
    </div>
  )
}