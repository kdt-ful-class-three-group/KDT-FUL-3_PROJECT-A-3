import Link from "next/link"

export function Tab() {
  
  return(
    <div>
      <ul>
        <li><Link href={"/home"}>메인</Link></li>
        <li><Link href={"/voca"}>용어 사전</Link></li>
        <li><Link href={"/simulation"}>모의 투자</Link></li>
      </ul>
    </div>
  )
}