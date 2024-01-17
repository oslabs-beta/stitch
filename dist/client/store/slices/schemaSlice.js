var _a;
import { createSlice } from '@reduxjs/toolkit';
import utilityFunctions from '../../../utilities/utilities';
var scalarParser = utilityFunctions.scalarParser, snakeToCamel = utilityFunctions.snakeToCamel;
import { loadSavedGithubView } from '../slices/dataSlice';
var initialState = {
    typeName: {
        name: '',
    },
    schemaFields: {},
    activeSchema: {
        name: '',
    },
    graphQL: {},
};
export var schemaSlice = createSlice({
    name: 'schemaSlice',
    initialState: initialState,
    reducers: {
        setTypeName: function (state, action) {
            state.typeName = action.payload;
        },
        addSchemaField: function (state, action) {
            var objectValue = action.payload.objectValue;
            state.schemaFields[snakeToCamel(action.payload.objectKey)] = scalarParser(objectValue);
        },
        toggleRequired: function (state, action) {
            if (state.schemaFields[action.payload.objectKey].requiredOption === false) {
                state.schemaFields[action.payload.objectKey].requiredOption = true;
            }
            else {
                state.schemaFields[action.payload.objectKey].requiredOption = false;
            }
        },
        deleteSchemaField: function (state, action) {
            delete state.schemaFields[action.payload.objectKey];
        },
        isArrayChange: function (state, action) {
            if (!state.schemaFields[action.payload.objectKey].isArray) {
                state.schemaFields[action.payload.objectKey].isArray = true;
            }
            else {
                state.schemaFields[action.payload.objectKey].isArray = false;
            }
        },
    },
    extraReducers: function (builder) {
        builder.addCase(loadSavedGithubView.fulfilled, function (state, action) {
            state.schemaFields = action.payload.schemaSlice.schemaFields;
            state.typeName = action.payload.schemaSlice.typeName;
        });
    },
});
export var setTypeName = (_a = schemaSlice.actions, _a.setTypeName), addSchemaField = _a.addSchemaField, toggleRequired = _a.toggleRequired, deleteSchemaField = _a.deleteSchemaField, isArrayChange = _a.isArrayChange;
export default schemaSlice.reducer;
//# sourceMappingURL=schemaSlice.js.map