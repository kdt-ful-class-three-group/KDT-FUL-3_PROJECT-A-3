import Link from "next/link";

export default function NotLogin() {
  return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-5">
        <h1 className="text-3xl font-bold">로그인이 필요한 페이지 입니다.</h1>
        <Link href='/home' className="w-37 h-10 bg-[#B0DB9C] rounded-lg text-white cursor-pointer flex justify-center items-center">로그인 페이지로 이동</Link>
      </div>
  )
}