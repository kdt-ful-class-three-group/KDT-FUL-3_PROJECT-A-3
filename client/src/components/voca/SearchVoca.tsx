// 검색 컴포넌트
import { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

//타입 지정
type Item = {
  //검색에 해당하는 데이터
  voca:string;
  name:string;
  description:string;
  formula:string|null
}
type Props = { //props로 가져올 데이터
  value:string; 
  onChange:(value:string)=> void; //input에 적용할 함수
  data:Item[];
  onSelect:(item:Item)=>void; //검색에 해당하는 리스트에 적용할 함수
}

export default function SearchVoca({value, onChange, data, onSelect}:Props){

  //검색할 내용 상태값
  const [search, setSearch] = useState<Item[]>([])


  return(
    <div style={{position:'relative'}}>
      <div style={{display:'flex'}}>
        <Input name='voca' type="search" value={value} onChange={(e)=>onChange(e.target.value)}/>
        <Button name='검색'/>
      </div>
      <div style={{position:'absolute', backgroundColor:'#fff', width:'100%'}}>
        {value && <p>검색중</p>}
      </div>
    </div>
  )
}