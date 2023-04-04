import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  schemaFields: {
    // test: 'test123'
  },
  activeSchema: {
    name: ''
  }
}

export const schemaSlice = createSlice({
  name: 'schemaSlice',
  initialState,
  reducers: {
    addSchemaField: (state, action) => {
      
      // come back to this - determine type of val
      const objectValue = action.payload.objectValue;
      console.log(typeof objectValue);
      console.log('action payload', action.payload)
      state.schemaFields[action.payload.objectKey] = typeof objectValue;
    }
  }
})

export const {addSchemaField} = schemaSlice.actions;
export default schemaSlice.reducer;