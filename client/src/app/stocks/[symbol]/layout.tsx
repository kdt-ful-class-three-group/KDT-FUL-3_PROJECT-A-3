'use client'

import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"
import { MdKeyboardArrowLeft } from "react-icons/md";
// * 어떤 가이드를 보여줄지 구별하기 위한 모듈
import { usePathname } from "next/navigation";
import introJS from 'intro.js'
import 'intro.js/introjs.css'
import { useEffect } from "react";
import { handleChartGuide, handleTradeGuide } from "@/utils/guide";



export default function StocksLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname()

    // ! 이전 화면에서 sessionstorage에 값을 담았다면 : start-chart-guide

    //* 가이드 작성 > 모의투자에도 사용됨 > pathname으로 구별
    const handleGuide = ()=>{
        const isStockPage =  /^\/stocks\/[^/]+$/.test(pathname)
        const isTradePage = /^\/stocks\/[^/]+\/trade$/.test(pathname);

        if(isStockPage){
            handleChartGuide()
        }
        if(isTradePage){
            handleTradeGuide()
        }

    }
    

    //가이드 자동 실행
    useEffect(()=>{
        const isStockPage = /^\/stocks\/[^/]+$/.test(pathname)
        const isTradePage = /^\/stocks\/[^/]+\/trade$/.test(pathname);

        if(sessionStorage.getItem('start-chart-guide') && isStockPage){
                handleChartGuide()
        }

        if(sessionStorage.getItem('start-trade-guide')&&isTradePage){
                handleTradeGuide()
        }
    },[pathname])


    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[420px] px-4 flex flex-col">
                {/* 버튼 영역 */}
                <div className="flex justify-between items-center py-4">
                    <MdKeyboardArrowLeft className="w-10 h-10 cursor-pointer" name="뒤로가기" onClick={()=>router.back()}/>
                    <Button name="가이드라인" className="w-37 h-10 bg-[#B0DB9C] rounded-lg text-white cursor-pointer" onClick={handleGuide} />
                </div>

                {/* 콘텐츠 */}
                {children}
            </div>
        </div>
    );
}