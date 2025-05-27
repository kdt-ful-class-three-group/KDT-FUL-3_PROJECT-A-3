//* 사용자의 회원가입 입력 정보를 Redux 전역상태로 관리하기 위해 작성

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//* 회원가입 타입 정의
type SignupState = {
  id:string;
  password:string;
  name:string;
  email:string;
  birth:string;

}

//*초기값 = Redux store에 처음 등록될 때 사용할 초기값
//*빈문자열 사용 -> 처음 화면 렌더링시 입력 필드 비어있도록 함
const initialState : SignupState = {
  id: '',
  password:'',
  name:'',
  email:'',
  birth:''
}

//* 슬라이스 생성
const signupSlice = createSlice({
  name:'signup', //Redux DevTools에서 구분할 때 사용
  initialState,
  reducers:{
    //* 하나의 액션으로 모든 필드 (id, email 등)를 갱신할 수 있게 만든 재사용 가능한 액션
    //* keyof SignupState -> 타입 안전하게 접근되도록 구성
    setField:(state, action:PayloadAction<{field: keyof SignupState; value:string}>)=>{
      state[action.payload.field]=action.payload.value;
    }, 
    //* 입력한 데이터를 초기 상태로 되돌림 , 회원가입 취소나 완료시 사용 가능
    resetSignup:()=>initialState,
  },
})

//내보내기 - 컴포넌트에서 사용할 수 있도록
export const { setField, resetSignup } = signupSlice.actions;
export default signupSlice.reducer;