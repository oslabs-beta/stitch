import { createSlice } from '@reduxjs/toolkit';
import utilityFunctions from '../../../utilities/utilities';
const { scalarParser, snakeToCamel } = utilityFunctions;

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
      const objectValue = action.payload.objectValue;
      state.schemaFields[snakeToCamel(action.payload.objectKey)] =
        scalarParser(objectValue);
    },
    toggleRequired: (state, action) => {
      state.schemaFields[action.payload].requiredOption++;
    },
    deleteSchemaField: (state, action) => {
      console.log(
        'in delete schema field reducer, objectKey:',
        action.payload.objectKey
      );
      delete state.schemaFields[action.payload.objectKey];
    },
  },
});

export const { addSchemaField, deleteSchemaField, toggleRequired } =
  schemaSlice.actions;
export default schemaSlice.reducer;
