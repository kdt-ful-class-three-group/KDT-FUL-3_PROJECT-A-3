// 내정보에서 사용될 유저의 주식 관련 데이터
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TradeItem } from "@/types/tradeItem";
import axios from "axios";

// 상태 타입
interface UserStatusState {
  tradeCount : number;
  tradeVolume : number;
  // successRate : number; //성공률
  topTrades : TradeItem[] // 많이 거래한 내역 3개
  loading : boolean;
  error : string | null;
}

// 초기값
const initialState : UserStatusState={
  tradeCount:0,
  tradeVolume:0,
  // successRate:0,
  topTrades:[],
  loading:false,
  error:null
}

//* createAsyncThunk = 비동기 작업을 위한 RTK 도구
export const getUserStatus = createAsyncThunk(
  // *인자 - 첫번째 : 액션 이름
  'userStatus/getUserStatus',
  //* 인자 - 두번째 : 비동기 함수
  async(userId:string, thunkAPI)=>{
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/userportfolio/history`,{},{
        withCredentials: true
      })

      const tradeCount = res.data.length;
      const tradeVolume = res.data.reduce(
        (sum:number, item:any)=> sum+item.price*item.much,0
      )

      // 성공률
      // const successCount = 1
      // const successRate = tradeCount === 0 ? 0 : Math.round((successCount/tradeCount)*100)

      // 상위3개
      //  종목별 누적 거래금액
      // 종목별 누적 거래금액을 계산하기 위한 Map 생성
      const tradeMap = new Map<string,number>()
      res.data.forEach((data:any)=>{
        // 각 symbol(종목)에 대해 누적 거래금액을 더함
        const current = tradeMap.get(data.symbol)||0
        tradeMap.set(data.symbol,current+data.price*data.much) //{"symbol"=> 누적거래금액}
      })

      // 종목별 누적 거래금액이 가장 높은 상위 3개 종목을 구함
      // 1. Map을 배열로 변환 후, 거래금액 기준 내림차순 정렬
      // 2. 상위 3개 symbol만 추출
      // 3. symbol에 해당하는 첫 거래내역을 res.data에서 찾아 반환
      // 4. 혹시라도 undefined가 섞이면 filter(Boolean)으로 제거
      const topTrades = Array.from(tradeMap.entries()).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([symbol])=>{
        return res.data.find((item:any)=>item.symbol===symbol)
      }).filter(Boolean) //혹시라도 undefined가 섞이면 제거


      // * 성공 시 fulfilled , 실패시 rejected
      return {tradeCount, tradeVolume, topTrades}
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
        state.topTrades = action.payload.topTrades;
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