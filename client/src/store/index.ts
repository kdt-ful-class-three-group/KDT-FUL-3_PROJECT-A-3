import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './slices/signupSlice'

// store
export const store = configureStore({
  reducer:{
    signup:signupReducer
  }
})

// 내보내기
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch