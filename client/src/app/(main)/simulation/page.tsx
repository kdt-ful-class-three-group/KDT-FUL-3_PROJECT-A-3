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

export default function Simulation() {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state:RootState)=>state.stock.selectedTab);


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
