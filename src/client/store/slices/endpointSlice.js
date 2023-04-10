import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //ON EACH CLICK, ADD URL AND JSON RESPONSE OBJ DATA AS K/V PAIRS TO ENDPOINTS OBJECT
  endpoints: {},
}

export const endpointSlice = createSlice({
  name: 'endpoints',
  initialState,
  reducers: {
    addEndpoint: (state, url) => {
      // TRIGGERS LOGIC TO HANDLE POSTING URL
      fetch('/postURL', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // HOW DO WE MAKE SURE THE URL IS BEING SENT BACK ON REQ.BODY.URL??
        body: JSON.stringify(url)
      })
      .then((response) => response.json())
      .then((data) => {
        state.endpoints[url] = data;
        //HOW TO CHECK IF STATE IS BEING UPDATED WITH NEW ENDPOINTS?
        // console.log(url);
        // console.log(state.endpoints.url)
        // console.log('in endpointSlice')
      })
    }
  }
})

export const { addEndpoint } = endpointSlice.actions

export default endpointSlice.reducer;