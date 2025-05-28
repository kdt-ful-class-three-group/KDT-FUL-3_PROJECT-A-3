import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdWater } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";


type iconProps = {
  icon : 'water' | 'up' | 'down'
}

// 주식 - aapl, tsla, nvda
// 주식 - 증감 close 데이터 사용
// 변동값 % = ((현재가 - 전일 종가)/전일종가) * 100

export default function StatusBar(){
  //온도
  const [temp, setTemp]= useState(0)
  //주식
  const [stock, setStock]= useState('')

  //한강물
  useEffect(()=>{
    async function fetchData(){
      try{
        //수온데이터
        const waterRes = await axios.get('https://api.ivl.is/hangangtemp/')
        setTemp(waterRes.data.temperature)

        //주식 데이터 최신 2개 비교
        const stockRes = await axios.get('http://localhost:8008/stocks/tsla')
        const current = parseFloat(stockRes.data.values[0].close);
        const prev = parseFloat(stockRes.data.values[1].close);

        const change = ((current-prev)/prev)*100
        setStock(change.toFixed(2)+'%')
      }
      catch(err){
        console.log('수온 데이터 가져오기 실패',err)
      }
    }

    fetchData()
  },[])

  return(
    <div>{temp} {stock}</div>
  )
}