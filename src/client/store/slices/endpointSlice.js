//DONT THINK WE ARE ACTUALLY USING THIS
import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
  //ON EACH CLICK, ADD URL AND JSON RESPONSE OBJ DATA AS K/V PAIRS TO ENDPOINTS OBJECT
  endpoints: {},
};

export const endpointSlice = createSlice({
  name: 'endpoints',
  initialState,
  reducers: {
    addEndpoint: (state, url) => {
      fetch('/postURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(url),
      })
        .then((response) => response.json())
        .then((data) => {
          state.endpoints[url] = data;
        });
    }
  },
});

export const { addEndpoint, deleteEndpoint } = endpointSlice.actions;

export default endpointSlice.reducer;
