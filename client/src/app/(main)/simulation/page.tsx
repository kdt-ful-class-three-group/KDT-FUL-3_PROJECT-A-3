'use client'

import AccountInfo from "@/components/simulation/AccountInfo";
import StockTab from "@/components/simulation/StockTab";
import {Button} from "@/components/common/Button";
import {useEffect} from "react";
import introJs from "intro.js";
import 'intro.js/introjs.css';
import {startIntro} from "@/app/(main)/utils/startIntro";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSelectedTab } from "@/store/slices/stockSlice";
import { useIsLoginCheck } from "@/hooks/useIsLoginCheck";
import { useState } from "react";


export default function Simulation() {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state:RootState)=>state.stock.selectedTab);

    const [authStatus, setAuthStatus] = useState<'loading' | 'ok' | 'no'>('loading');
  
    // * 페이지에 진입하면,
    useIsLoginCheck({authStatus, setAuthStatus});
  
  
    // * 상탯값이 변경 되기전에는 로딩중 화면이 뜨게 만듦.
    if (authStatus === 'loading') {
      return <div>로딩 중...</div>;
    }
  
    // * 상탯값이 ok일 경우 홈페이지 화면이 뜨게 만듦.
    if (authStatus === 'ok') {


  return (
    <div id="simlation" className="max-w-xl w-full mx-auto px-4 mt-[5%]">
        <div className="flex justify-end mb-3">
        <Button name="가이드라인" className="w-37 h-10 bg-[#B0DB9C] rounded-lg text-white cursor-pointer" onClick={()=>{startIntro(dispatch, setSelectedTab)}} />
        </div>
      <AccountInfo />
      <StockTab />
    </div>
  );
}
  return null;
}
