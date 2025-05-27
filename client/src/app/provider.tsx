//* Redux(전역 상태 관리)를 App 전체에 적용시키기 위한 Provider 컴포넌트
'use client'

import { Provider } from "react-redux" //store를 하위 컴포넌트로 공급
import { store } from "@/store" // configureStore로 만든 Redux store 객체

export function ReduxProvider({children}:{children: React.ReactNode}){
  return <Provider store={store}>{children}</Provider>
}