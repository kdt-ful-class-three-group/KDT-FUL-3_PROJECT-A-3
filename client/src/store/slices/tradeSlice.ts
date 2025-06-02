import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TradeState {
  symbol: string;
  price: number;
  type: 'sell' | 'buy' | ''
}

const initialState: TradeState = {
  symbol: '',
  price: 0,
  type: '',
}

export const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setTrade(state, action: PayloadAction<TradeState>) {
      return { ...state, ...action.payload }
    },
    resetTrade() {
      return initialState
    }
  }
})

export const { setTrade, resetTrade } = tradeSlice.actions
export default tradeSlice.reducer