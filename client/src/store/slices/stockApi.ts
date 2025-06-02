// RTK Query API service
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// 타입 지정
interface StockApiResponse{
  values:{close:string}[]
}

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8008/'}),
  endpoints: (builder)=>({
    getStockBySymbol: builder.query<StockApiResponse, string>({
      query:(symbol:string)=> `stocks/${symbol}`
    })
  })
})

export const {useGetStockBySymbolQuery} = stockApi