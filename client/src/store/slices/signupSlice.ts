import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 회원가입 상태 추가
type SignupState = {
  id:string;
  password:string;
  name:string;
  email:string;
  birth:string;

}

//타입 적용
const initialState : SignupState = {
  id: '',
  password:'',
  name:'',
  email:'',
  birth:''
}

// 슬라이스 생성
const signupSlice = createSlice({
  name:'signup',
  initialState,
  reducers:{
    setField:(state, action:PayloadAction<{field: keyof SignupState; value:string}>)=>{
      state[action.payload.field]=action.payload.value;
    },
    resetSignup:()=>initialState,
  },
})

//내보내기
export const { setField, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;