'use client'

import Card from "@/components/voca/Card";
import { useEffect, useState } from "react";
import SearchVoca from "@/components/voca/SearchVoca";

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
  {
    voca: "시장가 주문",
    name: "Market Order",
    description: "시장에 나온 가격으로 즉시 체결되는 주문 방식입니다.",
    formula: null,
  },
]

export default function Voca() {
  //검색에 사용
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<typeof vocaList[0]|null>(null)

  const [list, setList]=useState<typeof vocaList>([])
  
  useEffect(()=>{
    setList(vocaList)
  },[])

  return (
    <div>
      <h1>사전페이지</h1>
      <SearchVoca
        value={query}
        onChange={setQuery}
        data={list}
        onSelect={(item)=>{
          setSelected(item)
          setQuery(item.voca)//선택 후 검색창에 단어 넣기
        }}
        />
      {/* 여기에 단어장 컴포넌트나 기능을 추가할 수 있습니다. */}
      {list.map((item, index)=>(
        <Card key={index} vocaObj={item}/>
      ))}
    </div>
  );
}