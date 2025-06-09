'use client'

import { useState } from "react";
import { Button } from "../Button"
import { useRouter } from "next/navigation"
import StatusBar from "./StatusBar";
import { Hamburger } from "@/components/hamburger/Hamburger";
// import styles from './Menu.module.css'

export function Nav() {

  const router = useRouter();
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  
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
              <Button variant="icon" icon="hamburger" onClick={() => setHamburgerOpen(true)} />
              {isHamburgerOpen && <Hamburger onClose={() => setHamburgerOpen(false)} />}
          </div>
      </div>
  )
}