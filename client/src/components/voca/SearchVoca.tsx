// 검색 컴포넌트

import { Input } from "../common/Input";
import { Button } from "../common/Button";

//타입 지정
type Item = {
  //검색에 해당하는 데이터
  voca:string;
  name:string;
}
type Props = { //props로 가져올 데이터
  value:string; 
  onChange:(value:string)=> void; //input에 적용할 함수
  data:Item[];
  onSelect:(item:Item)=>void; //검색에 해당하는 리스트에 적용할 함수
}

export default function SearchVoca({value, onChange, data, onSelect}:Props){

  //검색할 내용 상태값


  return(
    <div style={{display:'flex'}}>
      <Input name='voca' type="search"/>
      <Button name='검색'/>
    </div>
  )
}