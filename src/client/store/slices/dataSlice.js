import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  endpointData: {
  },
  activeEndpoint: {
    url: '',
    responseBody: {},
  },
}

export const addDataCard = createAsyncThunk(
  'responseData/addDataCard',
  async (url) => {
    const request = await fetch('/postURL', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({url}),
    });
    const data = await request.json()
    // console.log('in reducer', data);
    return data;
  }
);

export const dataSlice = createSlice({
  name: 'responseData',
  initialState,
  reducers: {
    updateActiveEndpoint: (state, action) => {
      console.log('in update active endpoint reducer')
      // console.log({action})

      state.activeEndpoint = {
        url: action.payload,
        responseBody: state.endpointData[action.payload],
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDataCard.fulfilled, (state, action) => {
      // console.log("action", action);
      // console.log("action.meta", action.meta);
      // console.log("action.meta.arg", action.meta.arg);
      state.endpointData[action.meta.arg] = action.payload;
      state.activeEndpoint = {
        url: action.meta.arg,
        responseBody: action.payload
      };
      // console.log(action.payload);
      // console.log()
      // console.log(state.endpointData);
    });
  }
})


// // async thunk logic here
// export const fetchUsersAsync = createAsyncThunk(
  //   'addDataCard',
  //   async (url) => {
    //     const response = await fetch();
    //     return response.data;
    //   }
    // );
    
export const { updateActiveEndpoint } = dataSlice.actions
export default dataSlice.reducer;