'use client'
import { Section } from "../../common/Section";
import { NewsCard } from "./NewsCard";
import type { Article } from "@/types/news";
import { useEffect, useState } from "react";
import axios from "axios";

export function NewsSection() {

  //뉴스 데이터
  const [generalNews, setGeneralNews] = useState<Article[]>([]);
  const [interestNews, setInterestNews] = useState<Article[]>([]);
  //뉴스인덱스
  const [index, setIndex] = useState(0)

  //api키
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

  // 관심종목 더미데이터
  const interestKeywords = ['네이버'];

  // everythingUrl-키워드 & 최신순
  // 실시간 주요 뉴스 url
  const generalUrl = `https://newsapi.org/v2/everything?q=주식 OR 코스피 OR 증시&sortBy=publishedAt&apiKey=${apiKey}`;
  // 관심 종목 뉴스 url
  const interestQuery = interestKeywords.map(keyword => `"${keyword}"`).join(" OR ");
  const interestUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(interestQuery)}&sortBy=publishedAt&apiKey=${apiKey}`;

  // * axios - 뉴스 api
  // 실시간 주요 뉴스
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await axios.get(generalUrl)
        //디버깅
        // console.log(res.data.articles)
        //데이터 담기
        setGeneralNews(res.data.articles)
      }
      catch (err) {
        console.error('실시간 뉴스 불러오기 실패', err)
      }
    }
    //실행
    fetchNews()
  }, [])

  // 관심 종목 뉴스
  useEffect(() => {
    async function fetchInterestNews() {
      try {
        const res = await axios.get(interestUrl);
        setInterestNews(res.data.articles);
      } catch (err) {
        console.error('관심 뉴스 불러오기 실패', err);
      }
    }
    fetchInterestNews();
  }, []);

  //*  setInterval 10초마다 뉴스 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => i + 1);
    }, 10000); // 10초마다 변경

    return () => clearInterval(interval);
  }, [generalNews, interestNews]);
  

  return (
    <div>
      <Section
        title="실시간 뉴스"
        children={
          <div>
            {generalNews.length > 0 ? (
              <NewsCard article={generalNews[index % generalNews.length]} />
            ) : <p>뉴스 불러오는 중</p>}
          </div>
        }
      />

      <Section
        title="관심 뉴스"
        children={
          <div>
            {interestNews.length > 0 ? (
              <NewsCard article={interestNews[index % interestNews.length]} />
            ) : <p>관심 뉴스 없음</p>}
          </div>
        }
      />

    </div>
  )
}
