'use client'

import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"
import { MdKeyboardArrowLeft } from "react-icons/md";
// * 어떤 가이드를 보여줄지 구별하기 위한 모듈
import { usePathname } from "next/navigation";
import introJS from 'intro.js'
import 'intro.js/introjs.css'



export default function StocksLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname()


    //* 가이드 작성 > 모의투자에도 사용됨 > pathname으로 구별
    const handleGuide = ()=>{
        const intro = introJS()

        if(pathname?.includes('/stocks')){
            intro.setOptions({
                steps:[
                    {
                        element:'#stock-info',
                        intro: '주식 이름, 심볼, 가격을 확인할 수 있습니다'
                    },
                    {
                        element:'#favorite',
                        intro:'관심 종목으로 추가할 수 있습니다'
                    },{
                        element:'#stock-chart',
                        intro:'마우스를 올리면 해당 시기의 정보를 볼 수 있습니다'
                    },{
                        element:'#stock-button',
                        intro:'판매, 구매와 관련된 가이드를 보고 싶으면 버튼을 눌러주세요'
                    }
                ],
                showProgress: true,
                exitOnOverlayClick: false,
                nextLabel: '다음',
                prevLabel: '이전',
                doneLabel: '완료',
            }).oncomplete(()=>{
                // session 정보로 파악
                sessionStorage.setItem('start-trade-guide','true')
            }).start()
        }
    }



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