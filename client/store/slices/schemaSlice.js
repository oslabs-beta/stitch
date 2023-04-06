import { createSlice } from "@reduxjs/toolkit";
import utilityFunctions from "../../../utilities/utilities";
const { scalarParser } = utilityFunctions;

const initialState = {
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
    addSchemaField: (state, action) => {
      // come back to this - determine type of val

      const objectValue = action.payload.objectValue;
      state.schemaFields[action.payload.objectKey] = scalarParser(objectValue);
    },
    toggleRequired: (state, action) => {
      state.schemaFields[action.payload].requiredOption++;
    },
  },
});

export const { addSchemaField, toggleRequired } = schemaSlice.actions;
export default schemaSlice.reducer;
