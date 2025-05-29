'use client'
import { useState } from "react";

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
    // 검색 했을 때 스크롤 이동을 위한 id 추가 - 공백 없어야함 > replace 사용
    <div onClick={()=>isClick(!click)} id={`card-${vocaObj.voca.replace(/\s/g,'')}`}>
      <h1>{vocaObj?.voca}</h1>
      <p>{vocaObj?.name}</p>
      <div style={click ? {display:'block'}: {display:'none'}}>
        <p>{vocaObj?.description}</p>
        <p>{vocaObj?.formula}</p>
      </div>
    </div>
  )
}