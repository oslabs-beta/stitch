import { configureStore } from '@reduxjs/toolkit'

import dataReducer from './slices/dataSlice';
import schemaReducer from './slices/schemaSlice';

export const store = configureStore({
  reducer: {
    responseData: dataReducer,
    schemaSlice: schemaReducer,
  },
  // middleware: {
    
  // }
})