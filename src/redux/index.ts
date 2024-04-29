import { combineReducers, legacy_createStore as createStore } from 'redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import user from './modules/user'
import app from './modules/app'

export interface ReduxState {
  user: any
}
const reducer = combineReducers({
  user,
  app
})

// redux 持久化配置
const persistConfig = {
  key: 'app',
  version: 1,
  storage
}
const persistReducerConfig = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistReducerConfig,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: import.meta.env.NODE !== 'production'
})

// 创建持久化 store
const persistor = persistStore(store)

export { store, persistor }
