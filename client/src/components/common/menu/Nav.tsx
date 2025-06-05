'use client'

import { Button } from "../Button"
import { useRouter } from "next/navigation"
import StatusBar from "./StatusBar";
// import styles from './Menu.module.css'

export function Nav() {

  const router = useRouter();
  
  return(
      <div className="flex justify-between items-center w-full h-16 max-w-[534px] mx-auto bg-[#B0DB9C] px-4">


          <div>
              <StatusBar/>
          </div>

          <div>
              {/* 검색 페이지 이동*/}
              <Button
                  variant="icon"
                  icon="search"
                  onClick={() => router.push('/search')}
              />

              {/* 햄버거 메뉴 */}
              <Button variant="icon" icon="hamburger" onClick={() => router.push('/hamburger')}/>
          </div>
      </div>
  )
}