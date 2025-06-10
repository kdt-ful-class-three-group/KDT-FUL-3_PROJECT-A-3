import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 타입

interface HoldingItem {
  symbol: string;
  much: number;
}
interface StockState{
  holdings : HoldingItem[]
  interest : string[]
  selectedTab : '보유' | '관심' | '실시간 정보'
}

// 초기값
const initialState : StockState = {
  holdings:[],
  interest:[],
  selectedTab:'실시간 정보'
}

// 슬라이스 생성
const stockSlice = createSlice({
  name:'stock',
  initialState,
  reducers:{
    setHoldings: (state, action:PayloadAction<HoldingItem[]>)=>{
      state.holdings=action.payload
    },
    setInterest:(state, action:PayloadAction<string[]>)=>{
      state.interest = action.payload
    },
    setSelectedTab: (state, action:PayloadAction<'실시간 정보'|'관심'|'보유'>)=>{
      state.selectedTab=action.payload
    }
  }
})

// 내보내기
export const { setHoldings, setInterest, setSelectedTab } = stockSlice.actions
export default stockSlice.reducer