import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

import type { WritingState } from '../../types';

const initialState: WritingState = {
  slug: "SOMETHING WENT WRONG!"
};

export const writingSlice = createSlice({
  name: 'writing',
  initialState,
  reducers: {
    reset: state => initialState,
    initializeNewPost: state => {
      state.slug = (Math.floor(Math.random() * 1000000)).toString();
    },
    setSlug: (state, action: PayloadAction<string>) => {
      state.slug = action.payload;
    }
  }
});

export const { reset, initializeNewPost, setSlug } = writingSlice.actions;

export const sanitizeAndSetSlug = (newSlug: string) => async (dispatch: AppDispatch) => {
  let sanitizedSlug = newSlug;
  if (newSlug === '') {
    sanitizedSlug = (Math.floor(Math.random() * 1000000)).toString();
  }
  sanitizedSlug = sanitizedSlug.replace(' ', '-');
  sanitizedSlug = sanitizedSlug.toLowerCase();
  dispatch(setSlug(sanitizedSlug));
};

export default writingSlice.reducer;