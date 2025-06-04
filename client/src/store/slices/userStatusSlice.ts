// 내정보에서 사용될 유저의 주식 관련 데이터
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TradeItem } from "@/types/tradeItem";
// !더미 데이터
import { tradeItems } from "@/components/portfolio/mocks/tradeItem";

// 상태 타입
interface UserStatusState {
  tradeCount : number;
  tradeVolume : number;
  loading : boolean;
  error : string | null;
}

// 초기값
const initialState : UserStatusState={
  tradeCount:0,
  tradeVolume:0,
  loading:false,
  error:null
}

//! 거래정보 계산 - 추후 axios로 가져오기
//* createAsyncThunk = 비동기 작업을 위한 RTK 도구
export const getUserStatus = createAsyncThunk(
  // *인자 - 첫번째 : 액션 이름
  'userStatus/getUserStatus',
  //* 인자 - 두번째 : 비동기 함수
  async(userId:string, thunkAPI)=>{
    try {
      // ! axios로 가져오기, 더미데이터 사용
      const tradeCount = tradeItems.length;
      const tradeVolume = tradeItems.reduce(
        (sum:number, item:any)=> sum+item.price*item.much,0
      )

      // * 성공 시 fulfilled , 실패시 rejected
      return {tradeCount, tradeVolume}
    }
    catch(err){
      return thunkAPI.rejectWithValue('거래 데이터 불러오기 실패')
    }
  }
)

// slice 정의
export const userStatusSlice = createSlice({
  name:'userStatus',
  initialState,
  reducers:{}, //*동기 액션 없음
  extraReducers:(builder)=>{
    builder
      // *pending : 호출 시작 - 로딩 중 표시
      .addCase(getUserStatus.pending,(state)=>{
        state.loading=true;
        state.error = null;
      })
      // *성공 : 상태 업데이트
      .addCase(getUserStatus.fulfilled,(state,action)=>{
        state.tradeCount = action.payload.tradeCount;
        state.tradeVolume = action.payload.tradeVolume;
        state.loading = false
      })
      // *실패 : 에러 메시지
      .addCase(getUserStatus.rejected, (state, action)=>{
        state.loading=false;
        state.error = action.payload as string;
      })
  }
})

// 내보내기
export default userStatusSlice.reducer