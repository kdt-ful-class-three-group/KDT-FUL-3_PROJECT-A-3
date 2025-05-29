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