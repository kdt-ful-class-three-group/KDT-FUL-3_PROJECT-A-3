'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "../common/Button"
import { useRouter } from "next/navigation"
import { Account } from "@/types/account"

export default function AccountInfo(){
  const router = useRouter();

  // 정보
  const [account, setAccount] = useState<Account | null>(null)
  // 메세지
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-lg mx-auto">
      <div id="myAccount"className="mb-4 ">
        <p className="text-sm text-gray-500">내 계좌</p>
        <h3 className="text-lg font-semibold text-gray-800">{account?.account_number}</h3>
      </div>
      <div id="myAsset" className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-green-600">{account?.asset}풀</h1>
        <Button
          icon="chevron"
          id="goToPortfolio"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 hover:text-black transition"
          onClick={() => router.push('/portfolio')}
        />
      </div>
    </div>
  )
}