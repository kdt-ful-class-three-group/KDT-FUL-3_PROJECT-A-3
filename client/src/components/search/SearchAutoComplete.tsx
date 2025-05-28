"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { SearchDropdown } from "./SearchDropdown";
import { stockList } from "@/app/stocks/StockList";
import styles from "./SearchStyles.module.css";

export function SearchAutoComplete() {
  const [query, setQuery] = useState(""); // 검색 창 텍스트
  const [showDropdown, setShowDropdown] = useState(false); // 자동완성 초기 상태값임
  const wrapperRef = useRef<HTMLDivElement>(null); // 자동완성 영역클릭 감지
  const router = useRouter();

  // stockList에 symbol마다 한글이름 적어둠
  const filteredResults = stockList.filter(stock =>
    stock.name.includes(query)
  );

  // 자동완성 로직
  useEffect(() => {
    if (query && filteredResults.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, filteredResults]);

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


  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <SearchBar
        value={query}
        onChange={setQuery}
        onFocus={() => query && filteredResults.length >= 0 && setShowDropdown(true)}
      />
      {showDropdown && filteredResults.length > 0 && (
        <SearchDropdown
          results={filteredResults}
          onSelect={(symbol) => router.push(`/stocks/${symbol}`)}
          visible={true}
        />
      )}
    </div>
  );
}