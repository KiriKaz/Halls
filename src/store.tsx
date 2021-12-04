import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './features/authentication/login';

export const store = configureStore({
  reducer: {
    authentication: sessionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;