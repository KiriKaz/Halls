import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './features/authentication/login';
import notificationReducer from './features/notification';
import themingReducer from './features/theme';

export const store = configureStore({
  reducer: {
    authentication: sessionReducer,
    notification: notificationReducer,
    theming: themingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;