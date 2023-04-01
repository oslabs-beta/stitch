import { configureStore } from '@reduxjs/toolkit'

import dataReducer from './slices/dataSlice';

export const store = configureStore({
  reducer: {
    responseData: dataReducer,
  },
})