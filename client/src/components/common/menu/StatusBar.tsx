import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdWater } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";


type item = {
  icon : 'water' | 'up' | 'down',
  name : string, //한강물 또는 주식명
  count: string //온도 또는 증감률
}

// 주식 - aapl, tsla, nvda
// 주식 - 증감 close 데이터 사용
// 변동값 % = ((현재가 - 전일 종가)/전일종가) * 100

export default function StatusBar(){

  //데이터 배열 - count type은 number
  //[//한강물{icon:'water',name:'한강물',count:temp},//주식{icon: count>0 ? 'up':'down', name:'주식1',count:stock},{icon: count>0 ? 'up':'down', name:'주식2',count:stock}..{icon: count>0 ? 'up':'down', name:'주식10',count:stock}]
const [list, setList]= useState<item[]>([])

  //한강물
  useEffect(()=>{
    async function fetchData(){
      try{
        //수온데이터
        const waterRes = await axios.get('https://api.ivl.is/hangangtemp/')
        const temp = waterRes.data.temperature

        const newList : item[]=[{
          icon:'water',
          name:'실시간 한강물',
          count: temp+'℃'
        }]

        //주식 종목
        const symbols = ['tsla','aapl','nvda']
        //종목 -> 반복문
        for(const symbol of symbols){
          //주식 데이터 최신 2개 비교
          const stockRes = await axios.get(`http://localhost:8008/stocks/${symbol}`)
          const current = parseFloat(stockRes.data.values[0].close);
          const prev = parseFloat(stockRes.data.values[1].close);
          //증감 계신
          const change = ((current-prev)/prev)*100

          //데이터 추가
          newList.push({
            icon:change>=0 ? 'up':'down',
            name: symbol.toUpperCase(),
            count : change.toFixed(2)+'%'
          })

        }

        //상태값
        setList(newList)

        console.log(list)
      }
      catch(err){
        console.log('수온 데이터 가져오기 실패',err)
      }
    }

    fetchData()
  },[])

  return(
    <div>{list[2]?.count}</div>
  )
}