import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 타입
interface StockState{
  holdings : string[]
  interest : string[]
  selectedTab : '보유' | '관심' | '실시간 순위'
}

// 초기값
const initialState : StockState = {
  holdings:['aapl'],
  interest:['tsla','googl'],
  selectedTab:'보유'
}

// 슬라이스 생성
const stockSlice = createSlice({
  name:'stock',
  initialState,
  reducers:{
    setHoldings: (state, action:PayloadAction<string[]>)=>{
      state.holdings=action.payload
    },
    setInterest:(state, action:PayloadAction<string[]>)=>{
      state.interest = action.payload
    },
    setSelectedTab: (state, action:PayloadAction<'보유'|'관심'|'실시간 순위'>)=>{
      state.selectedTab=action.payload
    }
  }
})

// 내보내기
export const { setHoldings, setInterest, setSelectedTab } = stockSlice.actions
export default stockSlice.reducer