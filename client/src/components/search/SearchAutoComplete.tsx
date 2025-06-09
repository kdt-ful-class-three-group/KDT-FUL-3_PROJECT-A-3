"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchDropdown } from "./SearchDropdown";
import { stockList } from "@/components/stocks/StockList";
import { SearchContents } from "./SearchContents";
import { SearchBar } from "./SearchBar";

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
    <div className="w-full max-w-md px-4 mx-auto" ref={wrapperRef}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">무엇을 찾으시나요?</h1>
        <SearchBar
          value={query}
          onChange={setQuery}
          onFocus={() => query && filteredResults.length >= 0 && setShowDropdown(true)}
        />
      </div>
      {showDropdown && filteredResults.length > 0 && (
        <SearchDropdown
          results={filteredResults}
          onSelect={(symbol) => router.push(`/stocks/${symbol}`)}
          visible={true}
        />
      )}
      <SearchContents />
    </div>
  );
}