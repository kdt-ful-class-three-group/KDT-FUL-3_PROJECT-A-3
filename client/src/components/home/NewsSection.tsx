'use client'
import { Section } from "../common/Section";
import { useEffect, useState } from "react";
import axios from "axios";

export function NewsSection() {

  //뉴스 상태
  const [news, setNews] = useState([])

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
  // everythingUrl-한국기사 & 최신순
  const url = `https://newsapi.org/v2/everything?q=주식 OR 코스피 OR 삼성전자&sortBy=publishedAt&apiKey=${apiKey}`;

  //axios
  useEffect(()=>{
    async function fetchNews(){
      try{
        const res = await axios.get(url)
        console.log(res.data.articles)
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