import { configureStore } from '@reduxjs/toolkit'

import dataReducer from './slices/dataSlice';
import schemaReducer from './slices/schemaSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

//configuring store to persist - https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
const persistConfig = {
  key: 'root',
  storage
}

const persistedResponseReducer = persistReducer(persistConfig, dataReducer );
const persistedSchemaReducer = persistReducer(persistConfig, schemaReducer); 

export const store = configureStore({
  reducer: {
    // responseData: dataReducer,
    // schemaSlice: schemaReducer,
    responseData: persistedResponseReducer,
    schemaSlice: persistedSchemaReducer
  },
  middleware: [thunk]
})

export const persistor = persistStore(store);