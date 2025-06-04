'use client'

import SearchVoca from "./SearchVoca"
import Consonant from "./Consonant"
import styles from './VocaStyles.module.css'
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

  return(
    <div className={styles.voca}>
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