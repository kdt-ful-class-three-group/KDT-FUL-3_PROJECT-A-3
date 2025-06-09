'use client'
import StockShow from "./StockShow"
import { Button } from "../common/Button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setSelectedTab } from "@/store/slices/stockSlice"


export default function StockTab(){

  //버튼 클릭
  const dispatch = useDispatch()
  const selectedTab = useSelector((state:RootState)=>state.stock.selectedTab)

  return (
    <div className="mt-6 px-4">
      <div className="flex justify-center gap-2 mb-4">
        <Button
          name="보유"
          onClick={() => dispatch(setSelectedTab('보유'))}
          className={`w-28 py-1 rounded-full text-sm font-medium ${
            selectedTab === '보유'
              ? 'bg-gray-800 text-white'
              : 'bg-white border border-gray-300 text-gray-700'
          }`}
        />
        <Button
          name="관심"
          onClick={() => dispatch(setSelectedTab('관심'))}
          className={`w-28 py-1 rounded-full text-sm font-medium ${
            selectedTab === '관심'
              ? 'bg-gray-800 text-white'
              : 'bg-white border border-gray-300 text-gray-700'
          }`}
        />
        <Button
          name="실시간 순위"
          onClick={() => dispatch(setSelectedTab('실시간 순위'))}
          className={`w-28 py-1 rounded-full text-sm font-medium ${
            selectedTab === '실시간 순위'
              ? 'bg-gray-800 text-white'
              : 'bg-white border border-gray-300 text-gray-700'
          }`}
        />
      </div>
      <StockShow btnValue={selectedTab} />
    </div>
  )
}