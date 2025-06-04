// store/slices/symbolPriceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SymbolPriceState = {
  [symbol: string]: {
    price: number
  }
}

// * 들어갈 값들을 지정해주고, 초기값을 0으로 지정해준다.
const initialState: SymbolPriceState = {
  TSLA: { price: 0 },
  GOOGL: { price: 0 },
  NVDA: { price: 0 },
  AAPL: { price: 0 },
  AMZN: { price: 0 },
  NFLX: { price: 0 },
  META: { price: 0 },
  SBUX: { price: 0 },
}

const symbolPriceSlice = createSlice({
  name: 'symbolPrice',
  initialState,
  reducers: {
    setSymbolPrice: (
      state,
      action: PayloadAction<{ symbol: string; price: number }>
    ) => {
      const { symbol, price } = action.payload
      if (state[symbol]) {
        state[symbol].price = price
      } else {
        state[symbol] = { price } // 혹시 없는 심볼이 들어올 경우에도 대비
      }
    },
  },
})

export const { setSymbolPrice } = symbolPriceSlice.actions
export default symbolPriceSlice.reducer