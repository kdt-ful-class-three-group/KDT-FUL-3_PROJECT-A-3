// 주식 실시간 순위
// 등락률 - ((현재가 - 전일 종가) / 전일 종가) * 100

import { stockList } from "../stocks/StockList"
import { useEffect, useState } from "react"
import StockCard from './StockCard'
import axios from "axios"

//! 임시 타입 지정
type cardItem = {
  name : string;
  current : number;
  comparison : number;
  change : number;
}

export default function StockShows  ({btnValue}:{btnValue:string}){

  //보유
  const [get, setGet] = useState<string[]>([])
  // 관심
  const [interest, setInterest] = useState<string[]>([])
  //card에 전달할 데이터
  const [data, setData]= useState<cardItem[]>([])

  // 전체 리스트
  const all = stockList.map(i=> i.symbol)
  
  
  useEffect(()=>{
    
    // !임시로 선정
    setGet(['aapl'])
    setInterest(['tsla','googl'])
    
  },[])
  
  useEffect(()=>{
    //get, interest 값이 없으면
    if((btnValue==='보유'&&get.length===0)||(btnValue==='관심'&&interest.length===0)){
      return;
    }

    // btnvalue에 따라 계산
    const take = (btnValue==='보유'?get: btnValue==='관심'? interest : all).map(i=>i.toUpperCase())


    //! api에서 데이터 가져오기 > 추후 변경 가능성 있음
    
    // take 값이 없을 때
    if(take.length === 0) return

    async function fetchData(){
      // 데이터 담을 변수
      const result : cardItem[]=[]

      //해당 symbol에 대한 데이터
      for(const symbol of take){
        try{
          // 주식 데이터
          const stockRes = await axios.get(`http://localhost:8008/stocks/${symbol}`)

          console.log('데이터확인',stockRes)
          //조건에 해당하지 않을때
          if(!stockRes.data.values || stockRes.data.values.length<2){
            console.log('데이터부족')
            continue;
          }
          const current = parseFloat(stockRes.data.values[0].close);
          const prev = parseFloat(stockRes.data.values[1].close);
          const change = ((current-prev)/prev)*100

          result.push({
            name:symbol,
            current,
            comparison: current-prev,
            change
          })
        } catch (err){
          console.error('데이터 가져오기 실패',err)
        }
      }
      console.log('수집한 데이터',result)
      setData(result)

    }
    fetchData()
  },[btnValue, get, interest,all])


  // 디버깅
  useEffect(() => {
  console.log("btnValue:", btnValue)
  console.log("get:", get)
  console.log("interest:", interest)
}, [btnValue, get, interest])

// 디버깅
useEffect(()=>{
  console.log('data',data)
},[data])


  return(
    <div>
      {data.map((item, i)=>(
        <StockCard key={i} item={item}/>
      ))}
    </div>
  )
}