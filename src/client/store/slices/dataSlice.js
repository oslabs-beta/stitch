import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  endpointData: {
  },
  activeEndpoint: {
    url: '',
    responseBody: {},
  },
  activeUserGithubInfo: {
    
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
    setActiveUserGithubInfo: (state, action) => {
      console.log('in reducer');
      state.activeUserGithubInfo = {
        login: action.login,
        id: action.id,
        accessToken: action.accessToken,
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addDataCard.fulfilled, (state, action) => {
      state.endpointData[action.meta.arg] = action.payload;
      state.activeEndpoint = {
        url: action.meta.arg,
        responseBody: action.payload
      };
    });
  }
})
    
export const { updateActiveEndpoint, setActiveUserGithubInfo } = dataSlice.actions
export default dataSlice.reducer;