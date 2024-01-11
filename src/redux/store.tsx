import { configureStore,applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import CounterReducer from './features/counterSlice'
export const store = configureStore({
  reducer: {
    CounterReducer ,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type appDispath = typeof store.dispatch;
