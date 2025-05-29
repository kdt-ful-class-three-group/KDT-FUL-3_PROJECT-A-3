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
  {
    voca: "ㄱ",
    name: "Market Order",
    description: "시장에 나온 가격으로 즉시 체결되는 주문 방식입니다.",
    formula: null,
  },
  {
    voca: "ㄴ 주문",
    name: "Market Order",
    description: "시장에 나온 가격으로 즉시 체결되는 주문 방식입니다.",
    formula: null,
  },
  {
    voca: "a 주문",
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
    //초성 순으로 정렬
    const Chosung = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']

    function getFirstChar(text:string):string{
      // 값이 없으면 빈 문자열 반환
      if(!text) return ''
      const firstChar = text.trim().charAt(0) //첫번째 문자 추출

      const code = firstChar.charCodeAt(0)//유니코드 코드 값
      // 한글 유니코드에 속하는지 확인
      if(code >= 0xac00 && code <= 0xd7a3){
        //한글 유니코드에서 초성 뽑기 - 한글 공식 = 초성*588 + 중성*28 + 종성+ 0xAC00
        const index = Math.floor((code- 0xac00)/588)
        return Chosung[index]
      }
      //영어 - 소문자 대문자 검사 후 대문자로 반환
      if((code>=65 && code <=90)|| (code>=97 && code <= 122)){
        return firstChar.toUpperCase()
      }

      // 기타
      return '#'

    }

    //정렬
    const sortedList = vocaList.sort((a,b)=>{
      const one = getFirstChar(a.voca || a.name)
      const two = getFirstChar(b.voca||b.name)

      return one.localeCompare(two)
    })

    //정렬된 리스트 넣기
    setList(sortedList)

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
          //스크롤 이동
          const id = `card-${item.voca.replace(/\s/g,'')}`
          const el = document.getElementById(id)
          if(el){
            el.scrollIntoView({behavior:'smooth',block:'start'})
            setQuery('')//선택 후 입력내용 초기화
          }
          
        }}
        />
      {/* 여기에 단어장 컴포넌트나 기능을 추가할 수 있습니다. */}
      {list.map((item, index)=>(
        <Card key={index} vocaObj={item}/>
      ))}
    </div>
  );
}