import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdWater } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { stockList } from "@/components/stocks/StockList";

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

  //배열인덱스
  const [index, setIndex]= useState(0)

  //한강물
  useEffect(()=>{
    async function fetchData(){
      try{
        //수온데이터
        const waterRes = await axios.get('https://api.ivl.is/hangangtemp/')
        const temp = waterRes.data.temperature

        const newList : item[]=[{
          icon:'water',
          name:'한강',
          count: temp+'℃'
        }]

        //주식 종목
        const symbols = stockList.map((i) => i.symbol)
        //종목 -> 반복문
        for(const symbol of symbols){
          //주식 데이터 최신 2개 비교
          const stockRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/stocks/${symbol}`)

          //조건에 해당하지 않을때
          if(!stockRes.data.values || stockRes.data.length<2){
            console.log('데이터부족')
            continue;
          }

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

      }
      catch(err){
        console.log('데이터 가져오기 실패',err)
      }
    }
    
    fetchData()
  },[])
  
  //30초 마다 업데이트
  useEffect(()=>{
    if (list.length === 0) return;
    
    const updateList = setInterval(()=>{
      setIndex(i=>(i+1)%list.length)
      // console.log(list)
    },1000*10)

    //cleanup
    return ()=> clearInterval(updateList)
  },[list])

  return(
    <div style={{display:'flex'}}>
      <p>
        {list[index]?.icon === 'water' ? (
        <IoMdWater color="skyblue"/>
        ) : list[index]?.icon === 'up' ? (
        <FaCaretUp color='red'/>
        ) : list[index]?.icon === 'down' ? (
        <FaCaretDown color='blue'/>
        ) : (
        '↺'
        )}
      </p>
      <p>{list[index]?.name}</p>
      <p>{list[index]?.count}</p>
    </div>
  )
}