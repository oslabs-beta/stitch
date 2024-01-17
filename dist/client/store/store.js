import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import schemaReducer from './slices/schemaSlice';
export var store = configureStore({
    reducer: {
        responseData: dataReducer,
        schemaSlice: schemaReducer,
    }
});
//# sourceMappingURL=store.js.map