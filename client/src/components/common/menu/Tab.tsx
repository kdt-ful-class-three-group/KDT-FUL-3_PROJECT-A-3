// Tab.tsx
'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import styles from './Menu.module.css'

export function Tab() {
  const pathname = usePathname()

  return (
    <div className={styles.tab}>
      <ul>
        <li>
          <Link href="/home" className={pathname === '/home' ? styles.active : ''}>메인</Link>
        </li>
        <li>
          <Link href="/voca" className={pathname === '/voca' ? styles.active : ''}>주식 용어</Link>
        </li>
        <li>
          <Link href="/simulation" className={pathname === '/simulation' ? styles.active : ''}>모의 투자</Link>
        </li>
      </ul>
    </div>
  )
}