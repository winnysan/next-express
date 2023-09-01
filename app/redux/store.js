import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist'
import storage from './customStorage'
import { apiSlice } from './slices/apiSlice'
import authSliceReducer from './slices/authSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})
