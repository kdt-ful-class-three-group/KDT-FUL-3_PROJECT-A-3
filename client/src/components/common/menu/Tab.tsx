import Link from "next/link"

export function Tab() {
  
  return (
    // 스타일 나중에 수정
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px'}}>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0}}>
        <li><Link href={"/home"}>메인</Link></li>
        <li><Link href={"/voca"}>용어 사전</Link></li>
        <li><Link href={"/simulation"}>모의 투자</Link></li>
      </ul>
    </div>
  )
}