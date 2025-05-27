'use client'
import { Section } from "../common/Section";
import { useEffect, useState } from "react";
import axios from "axios";

export function NewsSection() {

  //뉴스 상태
  const [news, setNews] = useState([])

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
  const url = `https://newsapi.org/v2/everything?q=ai&sortBy=publishedAt&apiKey=${apiKey}`;

  //axios
  useEffect(()=>{
    async function fetchNews(){
      try{
        const res = await axios.get(url)
        console.log(res.data)
      }
      catch(err){
        console.error('뉴스 불러오기 실패',err)
      }
    }

    //실행
    fetchNews()
  },[])


  return (
    <Section
      title="뉴스"
      description="최신 뉴스와 업데이트를 확인하세요."
      children={<p>뉴스 섹션 내용이 여기에 들어갑니다.</p>}
    />
  )
}