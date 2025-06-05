// 주식 실시간 순위
// 등락률 - ((현재가 - 전일 종가) / 전일 종가) * 100

import { stockList } from "../stocks/StockList"
import { useDispatch } from "react-redux"
import { setHoldings, setInterest } from '@/store/slices/stockSlice'
  
import { useEffect } from "react"
import StockCard from './StockCard'
import axios from "axios"

// RTK
import { useSelector} from "react-redux"
import { RootState } from "@/store"
import { useRouter } from "next/navigation"


export default function StockShows  ({btnValue}:{btnValue:string}){
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserStockData = async () => {
      try {
        const res = await axios.post('http://localhost:8008/favorites/user', {} , { withCredentials:true }); 
        // dispatch(setHoldings(res.data.holdings));
        const favoritesSymbol = res.data.map((item:any) => item.symbol)
        
        console.log(favoritesSymbol);

        dispatch(setInterest(favoritesSymbol));
      } catch (err) {
        console.error("유저 보유/관심 종목 불러오기 실패", err);
      }
    };

    fetchUserStockData();
  }, [dispatch]);
  // 전체 리스트
  const all = stockList.map(i=> i.symbol)
  // RTK 해당 데이터 가져오기
  const holdings = useSelector((state:RootState)=>state.stock.holdings)
  const interest = useSelector((state:RootState)=> state.stock.interest)

  const router = useRouter();

  // symbol
  let symbols:string[]=[]

  if(btnValue==='보유'){
    symbols=holdings
  } else if (btnValue==='관심'){
    symbols=interest
  } else {
    symbols = all
  }

  // ! all -> 순위 로직 필요함

  return(
    <div>
      {symbols.map((item, index)=>(
        <div key={index} style={{cursor:'pointer'}} onClick={()=> router.push(`stocks/${item}`)}>
          <StockCard symbol={item}/>
        </div>
      ))}
    </div>
  )
}