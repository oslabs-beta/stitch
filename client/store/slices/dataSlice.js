import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  endpointData: {},
}

export const dataSlice = createSlice({
  name: 'responseData',
  initialState,
  reducers: {
    addDataCard: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // call endpoint to get back response data
      state['url'] += 'response data'
    },
    deleteDataCard: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { addDataCard, deleteDataCard, incrementByAmount } = dataSlice.actions

export default dataSlice.reducer;