'use client'

import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation"
import { MdKeyboardArrowLeft } from "react-icons/md";


export default function StocksLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[420px] px-4 flex flex-col">
                {/* 버튼 영역 */}
                <div className="flex justify-between items-center py-4">
                    <MdKeyboardArrowLeft className="w-10 h-10 cursor-pointer" name="뒤로가기" onClick={()=>router.back()}/>
                    <Button name="가이드라인" className="w-37 h-10 bg-[#B0DB9C] rounded-lg text-white cursor-pointer" onClick={() => { }} />
                </div>

                {/* 콘텐츠 */}
                {children}
            </div>
        </div>
    );
}