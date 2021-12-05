import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SnackbarKey } from 'notistack';
import type { Notification } from '../types';

const initialState: Notification[] = [];

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    enqueueSnackbar: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
    closeSnackbar: (state, action: PayloadAction<{ dismissAll: boolean, key: SnackbarKey }>) => {
      return state.map(notif => (
        (action.payload.dismissAll || notif.options.key === action.payload.key)
          ? { ...notif, dismissed: true }
          : { ...notif }
      ));
    },
    removeSnackbar: (state, action: PayloadAction<{ key: SnackbarKey }>) => {
      return state.filter(notif => notif.options.key !== action.payload.key);
    }
  }
});

export const { enqueueSnackbar, closeSnackbar, removeSnackbar } = notificationSlice.actions;

export default notificationSlice.reducer;