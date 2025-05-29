'use client'

import Card from "@/components/voca/Card";
import { useEffect, useState } from "react";
import VocaToolBar from "@/components/voca/VocaToolBar";
import axios from "axios";

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

export default function Voca() {
  //검색에 사용
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<any>(null)
  const [list, setList]=useState<any[]>([])
  
  useEffect(() => {
    axios.get('http://localhost:8008/voca') 
      .then(res => {
         // data = 백엔드에서 오는 vocaList 데이터
        const data = res.data;
        const sorted = data.sort((a: any, b: any) => {
          const one = getFirstChar(a.voca || a.name);
          const two = getFirstChar(b.voca || b.name);
          return one.localeCompare(two);
        });
        setList(sorted);
      })
      .catch(err => {
        console.error('단어 데이터 불러오기 실패:', err);
      });
  }, []);


  return (
    <div>
      <h1>사전페이지</h1>
      <VocaToolBar
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
        onScroll={(keyword)=>{
        //일치하는 리스트 찾기
        const findVoca = list.find(item=>{
          const first = getFirstChar(item.voca||item.name)
          return first===keyword
        })
        //찾았다면
        if(findVoca){
          const id = `card-${findVoca.voca.replace(/\s/g,'')}`
          const el = document.getElementById(id)
          if(el){
            el.scrollIntoView({behavior:'smooth',block:'start'})
          }
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