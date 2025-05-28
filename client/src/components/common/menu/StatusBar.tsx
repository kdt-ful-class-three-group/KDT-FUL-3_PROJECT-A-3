import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdWater } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";


type iconProps = {
  icon : 'water' | 'up' | 'down'
}

// 주식 - aapl, tsla, nvda
// 주식 - 증감
// 변동값 % = ((현재가 - 전일 종가)/전일종가) * 100

export default function StatusBar(){
  //온도
  const [temp, setTemp]= useState(0)

  //한강물
  useEffect(()=>{
    async function fetchData(){
      try{
        const waterRes = await axios.get('https://api.ivl.is/hangangtemp/')
        setTemp(waterRes.data.temperature)
      }
      catch(err){
        console.log('수온 데이터 가져오기 실패',err)
      }
    }

    fetchData()
  },[])

  return(
    <div></div>
  )
}