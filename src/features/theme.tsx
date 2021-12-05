import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SnackbarKey } from 'notistack';
import type { Theming } from '../types';

const initialState: Theming = {
  darkmode: true
};

export const themingSlice = createSlice({
  name: 'theming',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkmode = !state.darkmode;
    }
  }
});

export const { toggleDarkMode } = themingSlice.actions;

export default themingSlice.reducer;