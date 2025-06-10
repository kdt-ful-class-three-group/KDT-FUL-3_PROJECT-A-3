'use client'

import { useEffect, useState } from 'react';
import SearchVoca from "./SearchVoca"
import Consonant from "./Consonant"
//타입 지정
type Item = {
  //검색에 해당하는 데이터
  voca:string;
  name:string;
  description:string;
  formula:string|null
}

//타입 지정
type Props<T> = {
  value:string;
  onChange:(value:string)=>void;
  data:Item[];
  onSelect:(item:Item)=>void;
  onScroll : (initial:string)=>void;
}

export default function VocaToolBar<T extends {voca?:string; name:string;}>({value, onChange, data, onSelect, onScroll}:Props<T>){

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return(
    <div className={`
      ${isSticky ? 'sticky top-4 z-50 backdrop-blur-sm bg-white/30' : ''}
      left-4 flex flex-col gap-4 items-center rounded-md p-2 transition-all duration-300
    `}>
      <SearchVoca
        value={value}
        onChange={onChange}
        data={data}
        onSelect={onSelect}
      />
      <Consonant
        onSelect={onScroll}
      />
    </div>
  )
}