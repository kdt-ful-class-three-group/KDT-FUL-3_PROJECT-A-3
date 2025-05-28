"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SearchBar } from "./SearchBar";
import { SearchDropdown } from "./SearchDropdown";
import styles from "./SearchStyles.module.css";


export function SearchAutoComplete() {
  //상태값들
  const [query, setQuery] = useState(""); // 검색 창 텍스트
  const [results, setResults] = useState([]); // 검색 결과
  const [showDropdown, setShowDropdown] = useState(false); // 자동완성 초기 상태값임
  const wrapperRef = useRef<HTMLDivElement>(null); // 자동완성 영역클릭 감지
  const router = useRouter();

  useEffect(() => {
    // 검색 텍스트 없을시에 자동완성 영역 숨김처리
    if (!query) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    // 텍스트 바뀔때마다 300ms 후에 api 요청
    const delay = setTimeout(() => {
      axios.get(`http://localhost:8008/stocks/search?q=${query}`)
        .then(res => {
          setResults(res.data);
          setShowDropdown(true);
        })
        .catch(() => setResults([]));
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);


  // 여긴 외부클릭시 자동완성 닫히는 기능임
  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 선택시 종목 페이지 이동
  const handleSelect = (id: string) => {
    router.push(`/stock/${id}`);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <SearchBar
        value={query}
        onChange={setQuery}
        onFocus={() => query && results.length > 0 && setShowDropdown(true)}
      />
      {showDropdown && results.length > 0 && (
        <SearchDropdown results={results} onSelect={handleSelect} />
      )}
    </div>
  );
}