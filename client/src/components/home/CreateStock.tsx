// 계좌 생성 버튼
import { Button } from "../common/Button"
import {useState} from "react";
import Create from "@/components/account/Create";

type props = {
  onClick:()=>void
}

export default function CreateStock({onClick}:props){
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        confirm("계좌를 생성하시겠습니까?");
        setIsOpen(true);
    }


  return(
      <>
    <div style={{display:'flex', cursor:'pointer'}} >
      <Button variant="icon" icon="plus" onClick={handleClick} disabled={isOpen}/>
      <p>계좌 생성</p>
        {isOpen && <Create onClose={()=>setIsOpen(false)} />}
    </div>
      </>
  )
}