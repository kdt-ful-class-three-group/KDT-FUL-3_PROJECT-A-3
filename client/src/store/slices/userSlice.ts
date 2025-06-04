// mypage에서 사용할 userslice

import { createSlice } from "@reduxjs/toolkit";

// 레벨
interface Level {
  level:number;
  name: string;
  // 아이콘?
  exp:string;
}

// 유저
interface UserState{
  nick : string;
  level : Level;
  toNextLevel : {count : number, volume:number};
}

// 초기상태
const initialState: UserState={
  nick : '닉네임',
  level: {level:0, name:'신규',exp:'예시'},
  toNextLevel:{count:0,volume:0}
}

// 슬라이스
const userSlice = createSlice({
  name:'userCard',
  initialState,
  reducers:{
    setUser(state, action){
      return {...state, ...action.payload}
    }
  }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer