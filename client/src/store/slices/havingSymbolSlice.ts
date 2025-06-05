// store/slices/symbolmuchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type HavingSymbolState = {
  [symbol: string]: {
    much: number
  }
}

// * 들어갈 값들을 지정해주고, 초기값을 0으로 지정해준다.
const initialState: HavingSymbolState = {
  TSLA: { much: 0 },
  GOOGL: { much: 0 },
  NVDA: { much: 0 },
  AAPL: { much: 0 },
  AMZN: { much: 0 },
  NFLX: { much: 0 },
  META: { much: 0 },
  SBUX: { much: 0 },
}

const havingSymbolSlice = createSlice({
  name: 'havingSymbol',
  initialState,
  reducers: {
    setHavingSymbol: (
      state,
      action: PayloadAction<{ symbol: string; much: number }>
    ) => {
      const { symbol, much } = action.payload
      if (state[symbol]) {
        state[symbol].much = much
      } else {
        state[symbol] = { much } // 혹시 없는 심볼이 들어올 경우에도 대비
      }
    },
  },
})

export const { setHavingSymbol } = havingSymbolSlice.actions
export default havingSymbolSlice.reducer