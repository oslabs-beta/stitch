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
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await request.json()
    // console.log('in reducer', data);
    return data;
  }
);

export const saveGithubView = createAsyncThunk(
  'responseData/saveGithubView',
  async ({viewName, id}, { getState, dispatch }) => {
    // grab current state
    const { responseData, schemaSlice} = getState();
    const request = await fetch('/api/githubdata', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify( { responseData, schemaSlice, viewName, id} ),
    });
    const data = await request.json()
    console.log('in reducer', data);
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
    // Add Data Card Promise Resolve Handler
    builder.addCase(addDataCard.fulfilled, (state, action) => {
      state.endpointData[action.meta.arg] = action.payload;
      state.activeEndpoint = {
        url: action.meta.arg,
        responseBody: action.payload,
      };
    });
    // Save View Promise Resolve Handler
    builder.addCase(saveGithubView.fulfilled, (state, action) => {
      // state.endpointData[action.meta.arg] = action.payload;
      // state.activeEndpoint = {
      //   url: action.meta.arg,
      //   responseBody: action.payload
      // };
      console.log('done')
    });
  }
})
    
export const { updateActiveEndpoint, setActiveUserGithubInfo } = dataSlice.actions
export default dataSlice.reducer;
