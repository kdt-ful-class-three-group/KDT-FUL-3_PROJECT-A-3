// RTK Query API service
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8008/'}),
  endpoints: (builder)=>({
    getStockBySymbol: builder.query({
      query:(symbol:string)=> `stocks/${symbol}`
    })
  })
})

export const {useGetStockBySymbolQuery} = stockApi