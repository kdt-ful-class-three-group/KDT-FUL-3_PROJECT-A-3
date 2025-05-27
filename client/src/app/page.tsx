'use client';
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Default() {
const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  };
  
  return (
    <div>
      <button onClick={handleClick}>굶주린이</button>
    </div>
  );
}
