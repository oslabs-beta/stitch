import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  endpointData: {},
  activeEndpoint: {
    url: '',
    responseBody: {},
  },
  githubUserSavedViews: {
    views: []
  }
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
    // console.log('in reducer', data);
    return viewName;
  }
);

export const loadSavedGithubView = createAsyncThunk(
  'responseData/loadSavedGithubView',
  async ({viewName, id}, { getState, dispatch }) => {
    // grab current state
    // const { responseData, schemaSlice} = getState();
    console.log( { viewName, id } )
    const { responseData, schemaSlice} = getState();
    console.log('about to run get')
    const request = await fetch('/api/getview', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify( { viewName, id } ),
    });
    // console.log('done with request', request);
    const data = await request.json()
    // console.log('data response', data);
    // console.log('in reducer', data);
    // console.log(state.responseData)
    // console.log('schemaSlice', schemaSlice)
    // state.responseData = data.responseData
    // schemaSlice.schemaFields = data.schemaSlice.schemaFields
    // console.log(state.list)
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
    storeGithubUserView: (state, action) => {
      console.log('in storeGithubUserView reducer');
      console.log({action})
      // console.log({action.payload})

      state.githubUserSavedViews = {
        views: [...state.githubUserSavedViews.views, action.payload]
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
      state.githubUserSavedViews = {
        views: [...state.githubUserSavedViews.views, action.meta.arg.viewName]
      };
    });
    // Update state with saved view data
    // Save View Promise Resolve Handler
    // NEED TO PULL IN ALL OF STATE AND UPDATE IT HERE:  Keith 4/14 8:11pm
    builder.addCase(loadSavedGithubView.fulfilled, (state, action) => {
      // state.githubUserSavedViews = {
      //   views: [...state.githubUserSavedViews.views, action.meta.arg.viewName]
      // };
      // console.log(action.meta.arg)
      // console.log('in builder', console.log(action.meta.arg));
      // console.log(action.payload.responseData.endpointData)
      // const { schemaSlice } = getState();
      state.endpointData = action.payload.responseData.endpointData;
      state.activeEndpoint = action.payload.responseData.activeEndpoint;
      // console.log('schemaSlice', state.schemaSlice)
      // console.log('schemaSlice', state.typeName)
      // console.log('schemaSlice', state.schemaFields)
    });
  }
})
    
export const { updateActiveEndpoint, setActiveUserGithubInfo, storeGithubUserView } = dataSlice.actions
export default dataSlice.reducer;
