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

  return (
    <div
      onClick={() => isClick(!click)}
      id={`card-${vocaObj.voca.replace(/\s/g, '')}`}
      className="bg-blue-100 rounded-lg p-4 mb-4 shadow cursor-pointer transition hover:shadow-md"
    >
      <h1 className="text-xl font-bold text-black">{vocaObj.voca}</h1>
      <p className="text-md font-semibold text-sky-600">{vocaObj.name}</p>
      <div className={`${click ? 'block' : 'hidden'} mt-2`}>
        <p className="text-sm text-gray-700">{vocaObj.description}</p>
        {vocaObj.formula && <p className="text-sm text-gray-500 mt-1">{vocaObj.formula}</p>}
      </div>
    </div>
  )
}