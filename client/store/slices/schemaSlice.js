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
  },
});

export const { addSchemaField } = schemaSlice.actions;
export default schemaSlice.reducer;
