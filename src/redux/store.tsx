import { configureStore, } from "@reduxjs/toolkit";
import CounterReducer from './features/counterSlice'
export const store = configureStore({
  reducer: {
    CounterReducer ,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type appDispath = typeof store.dispatch;
