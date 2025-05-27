'use client'
import { Section } from "../common/Section";
import { useEffect, useState } from "react";
import axios from "axios";

//뉴스 데이터 타입 지정
type Article = {
  source:{
    id:string|null;
    name:string;
  };
  author:string|null;
  title:string;
  description:string;
  url:string;
  urlToImage:string|Blob|undefined;
  publishedAt:string;
  content:string;
}

export function NewsSection() {

  //뉴스 상태
  const [news, setNews] = useState<Article[]>([])

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
  // everythingUrl-한국기사 & 최신순
  const url = `https://newsapi.org/v2/everything?q=주식 OR 코스피 OR 삼성전자&sortBy=publishedAt&apiKey=${apiKey}`;

  //axios
  useEffect(()=>{
    async function fetchNews(){
      try{
        const res = await axios.get(url)
        //디버깅
        console.log(res.data.articles)
        //데이터 담기
        setNews(res.data.articles)
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
      children={
        <div>
        {news.length>0 ?(
          <div>

          <h3>{news[1].title}</h3>
          <a href={news[1].url} target="_blank" title="news">
          <img src={news[1].urlToImage} alt="" />
          </a>
          </div>
        ) : <p>,,,</p>}
        </div>
        
      }
    />
  )
}