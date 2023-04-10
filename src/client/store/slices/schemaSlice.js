import { createSlice } from '@reduxjs/toolkit';
import utilityFunctions from '../../../utilities/utilities';
const { scalarParser, snakeToCamel } = utilityFunctions;

const initialState = {
  schemaFields: {
    type: '',
    fields: {},
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
      // come back to this - determine type of val
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
    isArrayChange: (state, action) => {
      if (!state.schemaFields[action.payload.objectKey].isArray) {
        state.schemaFields[action.payload.objectKey].isArray = true;
      } else {
        state.schemaFields[action.payload.objectKey].isArray = false;
      }
    },
  },
});

export const {
  addSchemaField,
  toggleRequired,
  deleteSchemaField,
  isArrayChange,
} = schemaSlice.actions;
export default schemaSlice.reducer;
