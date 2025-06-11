'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Default() {
const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  };
  
  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
      <Image src="/zoorin2.png" alt="주린이공원" width={400} height={400} priority />
      <button onClick={handleClick} className='w-37 h-10 bg-[#B0DB9C] rounded-lg text-white cursor-pointer'>접속</button>
    </div>
  );
}
