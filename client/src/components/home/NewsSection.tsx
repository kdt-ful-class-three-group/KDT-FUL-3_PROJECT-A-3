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

  //뉴스 데이터
  const [news, setNews] = useState<Article[]>([])
  //뉴스인덱스
  const [index, setIndex] = useState(0)
  //api키
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
  // everythingUrl-키워드 & 최신순
  const url = `https://newsapi.org/v2/everything?q=주식 OR 코스피 OR 삼성전자&sortBy=publishedAt&apiKey=${apiKey}`;

  //axios - 뉴스 api
  useEffect(()=>{
    async function fetchNews(){
      try{
        const res = await axios.get(url)
        //디버깅
        // console.log(res.data.articles)
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

  //1시간마다 뉴스 업데이트
  useEffect(()=>{
    //1시간 setInterval
    const updateNews = setInterval(()=>{
      setIndex(i=>(i+1)%news.length)
    },3600000)

    //return clearInterval
    return () => clearInterval(updateNews)
  },[news])


  return (
    <Section
      title="뉴스"
      description="최신 뉴스와 업데이트를 확인하세요."
      children={
        <div>
        {news.length>0 ?(
          <div>
            <a href={news[index].url} target="_blank" title="news">
              <h3>{news[index].title}</h3>
              {
                news[index].urlToImage ? 
                <img src={news[index].urlToImage} alt={news[index].content} />
                : <div>이미지</div> //!추후 img와 사이즈 동일하게 맞추기
                
              }
            </a>
          </div>
        ) : <p>뉴스 불러우는 중</p>}
        </div>
        
      }
    />
  )
}