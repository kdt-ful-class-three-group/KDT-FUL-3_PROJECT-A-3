// components/PageWrapper.tsx
'use client';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { pageOrder } from '@/app/(main)/utils/pageOrder';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  const vocaIndex = pageOrder.indexOf('/voca');
  const currentIndex = pageOrder.indexOf(pathname);
  const prevIndex = pageOrder.indexOf(prevPathRef.current);

  let direction: 'left' | 'right' = 'left';
  if (pathname === '/voca' && prevIndex < currentIndex) direction = 'right';
  else if (pathname === '/voca' && prevIndex > currentIndex) direction = 'left';
  else if (prevPathRef.current === '/voca' && currentIndex < prevIndex) direction = 'left';
  else if (prevPathRef.current === '/voca' && currentIndex > prevIndex) direction = 'right';

  prevPathRef.current = pathname;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ x: direction === 'left' ? 300 : -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === 'left' ? -300 : 300, opacity: 0 }}
        transition={{
          x: { duration: 0.2 },
          opacity: { duration: 0.1 }
        }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          boxSizing: 'border-box',
          marginLeft: '10%',
          marginRight: '10%'
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 10vw',
          boxSizing: 'border-box',
          margin: '5%'
        }}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}