'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { pageOrder } from '../(main)/utils/pageOrder';

let prevPath = '/voca';

export function useSlide() {
  const pathname = usePathname();
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    const vocaIndex = pageOrder.indexOf('/voca');
    const prevIndex = pageOrder.indexOf(prevPath);
    const currentIndex = pageOrder.indexOf(pathname);

    if (prevIndex < vocaIndex && pathname === '/voca') {
      setDirection('right'); // home → voca: 오른쪽에서 들어옴
    } else if (prevIndex > vocaIndex && pathname === '/voca') {
      setDirection('left'); // simulation → voca: 왼쪽에서 들어옴
    } else if (prevPath === '/voca' && currentIndex < vocaIndex) {
      setDirection('left'); // voca → home: 왼쪽으로 나감
    } else if (prevPath === '/voca' && currentIndex > vocaIndex) {
      setDirection('right'); // voca → simulation: 오른쪽으로 나감
    }

    // 업데이트
    prevPath = pathname;
  }, [pathname]);

  return direction;
}