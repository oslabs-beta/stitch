import { createSlice } from "@reduxjs/toolkit";
import utilityFunctions from "../../../utilities/utilities";
const { scalarParser, snakeToCamel } = utilityFunctions;

const initialState = {
  typeName: {
    name: "",
  },
  schemaFields: {
    // test: 'test123'
  },
  activeSchema: {
    name: "",
  },
  graphQL: {},
};

export const schemaSlice = createSlice({
  name: "schemaSlice",
  initialState,
  reducers: {
    setTypeName: (state, action) => {
      console.log('This be Typename: ', action.payload);
      state.typeName = action.payload;
      console.log('This be Typename in State: ', state.typeName);
    },
    addSchemaField: (state, action) => {
      // come back to this - determine type of val
      const objectValue = action.payload.objectValue;
      state.schemaFields[snakeToCamel(action.payload.objectKey)] =
        scalarParser(objectValue);
    },
    toggleRequired: (state, action) => {
      // if not an Array, we only have 2 options to cycle between (required or Not required)
      if (!state.schemaFields[action.payload].isArray) {
        if (state.schemaFields[action.payload].requiredOption === 0) {
          state.schemaFields[action.payload].requiredOption = 1;
        } else {
          state.schemaFields[action.payload].requiredOption = 0;
        }
      }
      // if it is an Array, we have 4 options between (2 - 5) to cycle between
      else {
        if (
          state.schemaFields[action.payload].requiredOption === 0 ||
          state.schemaFields[action.payload].requiredOption === 5
        ) {
          state.schemaFields[action.payload].requiredOption = 1;
        }
        state.schemaFields[action.payload].requiredOption++;
        // else {
        //   state.schemaFields[action.payload].requiredOption++;
        // }
      }
    },
    deleteSchemaField: (state, action) => {
      console.log(
        "in delete schema field reducer, objectKey:",
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
  setTypeName,
  addSchemaField,
  toggleRequired,
  deleteSchemaField,
  isArrayChange,
} = schemaSlice.actions;
export default schemaSlice.reducer;
