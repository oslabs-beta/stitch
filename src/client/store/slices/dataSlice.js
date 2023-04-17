import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  endpointData: {},
  activeEndpoint: {
    url: '',
    responseBody: {},
  },
  githubUserSavedViews: {
    views: [],
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
    const data = await request.json();
    return data;
  }
);

export const saveGithubView = createAsyncThunk(
  'responseData/saveGithubView',
  async ({ viewName, id }, { getState }) => {
    const { responseData, schemaSlice } = getState();
    const request = await fetch('/api/githubdata', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ responseData, schemaSlice, viewName, id }),
    });
    const data = await request.json();
    return viewName;
  }
);

export const loadSavedGithubView = createAsyncThunk(
  'responseData/loadSavedGithubView',
  async ({ viewName, id }, { getState }) => {
    const request = await fetch('/api/getview', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ viewName, id }),
    });
    const data = await request.json();
    return data;
  }
);

export const dataSlice = createSlice({
  name: 'responseData',
  initialState,
  reducers: {
    updateActiveEndpoint: (state, action) => {
      state.activeEndpoint = {
        url: action.payload,
        responseBody: state.endpointData[action.payload],
      };
    },
    storeGithubUserView: (state, action) => {
      state.githubUserSavedViews = {
        views: [...state.githubUserSavedViews.views, action.payload],
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
        views: [...state.githubUserSavedViews.views, action.meta.arg.viewName],
      };
    });
    // Update state with saved view data
    builder.addCase(loadSavedGithubView.fulfilled, (state, action) => {
      state.endpointData = action.payload.responseData.endpointData;
      state.activeEndpoint = action.payload.responseData.activeEndpoint;
    });
  },
});

export const {
  updateActiveEndpoint,
  setActiveUserGithubInfo,
  storeGithubUserView,
} = dataSlice.actions;
export default dataSlice.reducer;
