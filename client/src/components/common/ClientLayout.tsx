'use client';

import { usePathname } from 'next/navigation';
import { Nav } from "@/components/common/menu/Nav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/find') || pathname === ('/');

  return (
    <>
      {!hideNav && <Nav />}
      {children}
    </>
  );
}