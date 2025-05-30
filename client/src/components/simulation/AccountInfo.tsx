'use client'
import { useEffect, useState } from "react"
import axios from "axios"

//타입
type Account = {
  id:number;
  user_id:string;
  account_number:string;
  asset:string
}

export default function AccountInfo(){

  // 정보
  const [account, setAccount] = useState<Account | null>(null)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const fetchAccount = async()=>{
      try{
        const res = await axios.get('http://localhost:8008/account/me',{
          withCredentials:true
        })
        setAccount(res.data)
        console.log('계좌 정보 가져옴')
      }
      catch(err){
        console.log('계좌 정보에 대한 에러',err)
        setMsg('계좌 정보를 불러오지 못했습니다')
      }
      finally{
        setMsg('계좌 정보를 불러오고 있습니다')
      }
    }
    fetchAccount()
  },[])

  return(
    <div>

    </div>
  )
}