import { createSlice } from '@reduxjs/toolkit';
import utilityFunctions from '../../../utilities/utilities';
const { scalarParser } = utilityFunctions;

const initialState = {
  schemaFields: {
    // test: 'test123'
  },
  activeSchema: {
    name: '',
  },
  graphQL: {},
};

export const schemaSlice = createSlice({
  name: 'schemaSlice',
  initialState,
  reducers: {
    addSchemaField: (state, action) => {
      // type of value
      const objectValue = action.payload.objectValue;
      state.schemaFields[action.payload.objectKey] = scalarParser(objectValue);
    },
    deleteSchemaField: (state, action) => {
      console.log(
        'in delete schema field reducer, objectKey:',
        action.payload.objectKey
      );
      delete state.schemaFields[action.payload.objectKey];
    },
    isArrayChange: (state, action) => {
      state.schemaFields[action.payload.objectKey].isArray = true;
    },
  },
});

export const { addSchemaField, deleteSchemaField, isArrayChange } =
  schemaSlice.actions;
export default schemaSlice.reducer;
