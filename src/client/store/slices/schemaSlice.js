import { createSlice } from '@reduxjs/toolkit';
import utilityFunctions from '../../../utilities/utilities';
const { scalarParser, snakeToCamel } = utilityFunctions;
import { loadSavedGithubView } from '../slices/dataSlice';

const initialState = {
  typeName: {
    name: '',
  },
  schemaFields: {},
  activeSchema: {
    name: '',
  },
  graphQL: {},
};

export const schemaSlice = createSlice({
  name: 'schemaSlice',
  initialState,
  reducers: {
    setTypeName: (state, action) => {
      state.typeName = action.payload;
    },
    addSchemaField: (state, action) => {
      const objectValue = action.payload.objectValue;
      state.schemaFields[snakeToCamel(action.payload.objectKey)] = scalarParser(objectValue);
    },
    toggleRequired: (state, action) => {
      if (state.schemaFields[action.payload.objectKey].requiredOption === false) {
        state.schemaFields[action.payload.objectKey].requiredOption = true;
      } else {
        state.schemaFields[action.payload.objectKey].requiredOption = false;
      }
    },
    deleteSchemaField: (state, action) => {
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
  extraReducers: (builder) => {
    builder.addCase(loadSavedGithubView.fulfilled, (state, action) => {
      state.schemaFields = action.payload.schemaSlice.schemaFields;
      state.typeName = action.payload.schemaSlice.typeName;
    });
  },
});

export const {
  setTypeName,
  addSchemaField,
  toggleRequired,
  deleteSchemaField,
  isArrayChange,
} = schemaSlice.actions;
export default schemaSlice.reducer;
