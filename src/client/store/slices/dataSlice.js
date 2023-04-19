// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   endpointData: {},
//   activeEndpoint: {
//     url: '',
//     responseBody: {},
//   },
//   githubUserSavedViews: {},
//   githubUserSavedViews: {
//     views: [],
//   },
// };

// export const addDataCard = createAsyncThunk(
//   'responseData/addDataCard',
//   async (url) => {
//     const request = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json',
//       },
//     });
//     const data = await request.json();
//     return data;
//   }
// );

// export const saveGithubView = createAsyncThunk(
//   'responseData/saveGithubView',
//   async ({ viewName, id }, { getState }) => {
//     const { responseData, schemaSlice } = getState();
//     const request = await fetch('/api/githubdata', {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({ responseData, schemaSlice, viewName, id }),
//     });
//     const data = await request.json();
//     return viewName;
//   }
// );

// export const loadSavedGithubView = createAsyncThunk(
//   'responseData/loadSavedGithubView',
//   async ({ viewName, id }, { getState }) => {
//     console.log('in async thunk')
//     const request = await fetch('/api/getview', {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       // body: JSON.stringify({ responseData, schemaSlice, viewName, id }),
//       body: JSON.stringify({ viewName, id }),
//     });
//     const data = await request.json();
//     console.log('response data', data)
//     return data;
//   }
// );

// export const dataSlice = createSlice({
//   name: 'responseData',
//   initialState,
//   reducers: {
//     updateActiveEndpoint: (state, action) => {
//       state.activeEndpoint = {
//         url: action.payload,
//         responseBody: state.endpointData[action.payload],
//       };
//     },
//     storeGithubUserView: (state, action) => {
//       state.githubUserSavedViews = {
//         views: [...state.githubUserSavedViews.views, action.payload],
//       };
//     },
//     deleteEndpoint: (state, action) => {
//       console.log('in dataslice reducers - delete endpoint', action.payload);
//       delete state.endpointData[action.payload];

//       const endpoints = Object.keys(state.endpointData);
//       //handling updating the active endpoint to reflect deleted endpoints

//       //if no more endpoints after endpoint is deleted, reset active endpoint to empty
//       if (endpoints.length === 0) {
//         console.log('in conditional statement');
//         state.activeEndpoint = {
//           url: '',
//           responseBody: {},
//         };
//       }
//       //update active endpoint to last endpoint in endpointData state object
//       else {
//         state.activeEndpoint = {
//           url: endpoints[endpoints.length - 1],
//           responseBody: state.endpointData[endpoints[endpoints.length - 1]],
//         };
//       }
//       // window.location.reload(false)
//     },
//   },
//   extraReducers: (builder) => {
//     // Add Data Card Promise Resolve Handler
//     builder.addCase(addDataCard.fulfilled, (state, action) => {
//       state.endpointData[action.meta.arg] = action.payload;
//       state.activeEndpoint = {
//         url: action.meta.arg,
//         responseBody: action.payload,
//       };
//     });
//     // Save View Promise Resolve Handler
//     builder.addCase(saveGithubView.fulfilled, (state, action) => {
//       // state.endpointData[action.meta.arg] = action.payload;
//       // state.activeEndpoint = {
//       //   url: action.meta.arg,
//       //   responseBody: action.payload
//       // };
//       console.log('done');
//     });
//   },
// });

// export const {
//   updateActiveEndpoint,
//   setActiveUserGithubInfo,
//   storeGithubUserView,
//   deleteEndpoint,
// } = dataSlice.actions;
// export default dataSlice.reducer;





//; OLD CODE BELOW

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
    deleteEndpoint: (state, action) => {
      console.log('in dataslice reducers - delete endpoint', action.payload);
      delete state.endpointData[action.payload];

      const endpoints = Object.keys(state.endpointData);
      //handling updating the active endpoint to reflect deleted endpoints

      //if no more endpoints after endpoint is deleted, reset active endpoint to empty
      if (endpoints.length === 0) {
        console.log('in conditional statement');
        state.activeEndpoint = {
          url: '',
          responseBody: {},
        };
      }
      //update active endpoint to last endpoint in endpointData state object
      else {
        state.activeEndpoint = {
          url: endpoints[endpoints.length - 1],
          responseBody: state.endpointData[endpoints[endpoints.length - 1]],
        };
      }
      // window.location.reload(false)
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
  deleteEndpoint,
} = dataSlice.actions;
export default dataSlice.reducer;