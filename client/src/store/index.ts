// store 생성
import { configureStore } from "@reduxjs/toolkit";
import signupReducre from './signupSlice'

export const store = configureStore({
  reducer:{
    signup:signupReducre
  }
})

//타입 정의
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch