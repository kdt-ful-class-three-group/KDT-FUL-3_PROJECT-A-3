// 회원가입 상태 slice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//타입
type SignupState = {
  id:string
  password:string
  email:string
  birth:string
}

const initialState:SignupState={
  id:'',
  password:'',
  email:'',
  birth:''
}

//slice 생성
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof SignupState; value: string }>) => {
      const { field, value } = action.payload
      state[field] = value
    },
    resetSignup: () => initialState,
  },
})

export const {setField, resetSignup } = signupSlice.actions
export default signupSlice.reducer