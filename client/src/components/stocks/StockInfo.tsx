import { StockInfoProps } from "@/types/stock";
import { getKoreanSymbol } from "./StockList";
import { IoSearchSharp } from "react-icons/io5";

import { FaMeta } from "react-icons/fa6";

import styles from './StockStyles.module.css'

export function StockInfo({ symbol, price }: StockInfoProps) {

  const koSymbol = getKoreanSymbol(symbol);

  return (
    <div className="flex justify-center">
        <div className="flex flex-col items-center">
            <h1 className="flex font-bold items-center text-2xl text-gray-800">
                {koSymbol}
                <span
                    className="w-20 h-6 px-2 mx-1 flex justify-center items-center text-gray-600 rounded-xl text-sm bg-[#D9D9D9]">
              {symbol} <IoSearchSharp/>
            </span>

            </h1>
            <span className="font-bold text-3xl">{price ?? "정보 없음"}</span>
        </div>
    </div>
  );
}