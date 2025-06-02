//* slice를 Redux에 등록
//복잡한 설명없이 스토어 만들기 가능
import { configureStore } from "@reduxjs/toolkit";
//slice 가져오는 코드, store에 등록하면 앱 전역에서 접근 가능
import signupReducer from './slices/signupSlice'
import tradeReducer from './slices/tradeSlice'
import accountReducer from './slices/accountSlice'

// store
export const store = configureStore({
  reducer:{
    signup: signupReducer, // 키 = state이름, state.signup.id 로 접근 가능
    trade: tradeReducer,
    account:accountReducer
  }
})

// 내보내기
export type RootState = ReturnType<typeof store.getState> //전체 Redux 상태 트리의 타입
export type AppDispatch = typeof store.dispatch //dispatch() 함수의 타입, 비동기 액션 타입 안전하게 사용 가능