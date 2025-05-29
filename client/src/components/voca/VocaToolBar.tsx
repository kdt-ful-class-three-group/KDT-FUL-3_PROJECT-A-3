'use client'

import SearchVoca from "./SearchVoca"
import Consonant from "./Consonant"

//타입 지정
type Props<T> = {
  value:string;
  onChange:(value:string)=>void;
  data:T[];
  onSelect:(item:T)=>void;
  onScroll : (initial:string)=>void;
}

export default function VocaToolBar(){

  return(
    <div>
      
    </div>
  )
}