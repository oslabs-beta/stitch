import { configureStore } from '@reduxjs/toolkit'

import dataReducer from './slices/dataSlice';
import schemaReducer from './slices/schemaSlice';
import endpointReducer from './slices/endpointSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


//configuring store to persist - https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['githubUserSavedViews']
// }

// const persistedDataReducer = persistReducer(persistConfig, dataReducer);
// const persistedSchemaReducer = persistReducer(persistConfig, schemaReducer)

export const store = configureStore({
  // reducer: {
  //   responseData: persistedDataReducer,
  //   schemaSlice: persistedSchemaReducer,
  // },
  // middleware: [thunk]
  reducer: {
    responseData: dataReducer, 
    schemaSlice: schemaReducer,
  }
})

// export const persistor = persistStore(store)
