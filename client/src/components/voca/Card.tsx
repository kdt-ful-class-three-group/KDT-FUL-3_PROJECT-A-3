'use client'
import { useState } from "react";

// !임시 데이터
const vocaList = [
    {
    voca : "PER",
    name: "Price Earnings Ratio",
    description: "주가를 주당순이익(EPS)으로 나눈 값으로, 주가가 기업의 이익에 비해 고평가 또는 저평가되었는지를 판단하는 지표입니다.",
    formula: "PER = 주가 / EPS"
  },
  {
    voca : "Limit Order",
    name: "Limit Order",
    description: "투자자가 지정한 가격 이상 또는 이하에서만 체결되도록 하는 주문입니다.",
    formula: null
  },
]

type props = {
  vocaObj:{
    voca:string;
    name:string;
    description:string;
    formula:string|null
  }
}

export default function Card({vocaObj}:props){

  const [click, isClick] = useState(false)

  return(
    <div onClick={()=>isClick(!click)}>
      <h1>{vocaObj?.voca}</h1>
      <p>{vocaObj?.name}</p>
      <div style={click ? {display:'block'}: {display:'none'}}>
        <p>{vocaObj?.description}</p>
        <p>{vocaObj?.formula}</p>
      </div>
    </div>
  )
}