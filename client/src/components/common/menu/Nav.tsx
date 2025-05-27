import { Button } from "../Button"

export function Nav() {
  
  return(
    <div>
      <div>
        <p>온도 체크</p>
      </div>

      <div>
        {/* 검색 메뉴 */}
        <Button variant="icon" icon="search" />
        {/* 알림메뉴 */}
        <Button variant="icon" icon="hamburger" />
      </div>
    </div>
  )
}