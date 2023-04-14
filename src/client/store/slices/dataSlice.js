import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  endpointData: {},
  activeEndpoint: {
    url: '',
    responseBody: {},
  },
};

export const addDataCard = createAsyncThunk(
  'responseData/addDataCard',
  async (url) => {
    const request = await fetch(url, {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
      // body: JSON.stringify({ url }),
    });
    const data = await request.json();
    // console.log('in reducer', data);
    return data;
  }
);

export const dataSlice = createSlice({
  name: 'responseData',
  initialState,
  reducers: {
    updateActiveEndpoint: (state, action) => {
      console.log('in update active endpoint reducer');
      // console.log({action})

      state.activeEndpoint = {
        url: action.payload,
        responseBody: state.endpointData[action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDataCard.fulfilled, (state, action) => {
      state.endpointData[action.meta.arg] = action.payload;
      state.activeEndpoint = {
        url: action.meta.arg,
        responseBody: action.payload,
      };
    });
  },
});

// // async thunk logic here
// export const fetchUsersAsync = createAsyncThunk(
//   'addDataCard',
//   async (url) => {
//     const response = await fetch();
//     return response.data;
//   }
// );

export const { updateActiveEndpoint } = dataSlice.actions;
export default dataSlice.reducer;
