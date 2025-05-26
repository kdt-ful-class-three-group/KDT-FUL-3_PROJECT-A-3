// Redux Provider를 storybook에도 적용
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'

export const withReduxProvider = (Story: any) =>{
  <Provider store={store}>
    <Story />
  </Provider>
}