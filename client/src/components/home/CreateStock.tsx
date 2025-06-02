// 계좌 생성 버튼
import { Button } from "../common/Button"
import {useState} from "react";
import Create from "./account/Create";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setField } from "@/store/slices/accountSlice";

type props = {
  onClick:()=>void
}

export default function CreateStock({onClick}:props){
  // * 변수의 값을 바꾸기 위해서 디스패치 선언
  const dispatch = useDispatch();
  // * 리덕스 툴킷으로 계좌 번호, 자산 변수 불러오기
    const {account_number, asset} = useSelector((state:RootState) => state.account)

    // * dataChange를 활용하면 값을 변경.
    function dataChange(field: 'account_number'|'asset', value:string) {
      dispatch(setField({field, value}))
    }

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
          setIsOpen(true);

          axios.post('http://localhost:8008/account/createNumber', {}, {
            withCredentials: true,
          }).then(res => {
          console.log(res.data);
            dataChange('account_number', res.data.account_number);
            dataChange('asset', res.data.asset);
         });
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