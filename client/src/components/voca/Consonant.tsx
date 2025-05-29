'use client'
// 타입
type Props = {
  
}
//한글
const Kr_list = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'] 
// 영어
const Us_list = Array.from({length:26},(_,i)=>String.fromCharCode(65+i))

export default function Consonant(){

  return(
    <div>
      <div style={{display:'flex', justifyContent:'space-between' }}>
        {
          Kr_list.map(item=>(
            <p key={item}>{item}</p>
          ))
        }
      </div>
      <div style={{display:'flex', justifyContent:'space-between' }}>
        {
          Us_list.map(item=>(
            <p key={item}>{item}</p>
          ))
        }
      </div>
    </div>
  )
}