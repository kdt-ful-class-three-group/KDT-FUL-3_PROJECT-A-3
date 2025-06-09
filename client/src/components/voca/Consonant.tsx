'use client'
// 타입
type Props = {
  onSelect:(keyword:string)=>void
}
//한글
// const Kr_list = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'] 
// 영어
const Us_list = Array.from({length:26},(_,i)=>String.fromCharCode(65+i))

export default function Consonant({onSelect}:Props){

  return (
    <div className="flex flex-wrap justify-center gap-2 w-full mt-4">
      {[...Us_list].map((item) => (
        <p
          key={item}
          onClick={() => onSelect(item)}
          className="cursor-pointer text-sm hover:text-green-500 transition w-6 text-center"
        >
          {item}
        </p>
      ))}
    </div>
  )
}