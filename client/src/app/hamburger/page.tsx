'use client'

import { useRouter } from "next/router"
import { Hamburger } from "@/components/hamburger/Hamburger"

export default function HamburgerPage(){
  const router = useRouter();

  //화면 닫기
  return(
    <div>
      <Hamburger onClose={()=>{router.back()}}/>
    </div>
  )
}