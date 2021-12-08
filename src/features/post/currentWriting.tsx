import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

import type { WritingState } from '../../types';

const initialState: WritingState = {
  title: 'How I overcame being a simpleton',
  slug: "THIS SHOULD NEVER SHOW UP!"
};

export const writingSlice = createSlice({
  name: 'writing',
  initialState,
  reducers: {
    reset: state => initialState,
    initializeNewPost: state => {
      state.slug = (Math.floor(Math.random() * 1000000)).toString();
      state.title = 'How I overcame being a simpleton';
      state.editing = undefined;
    },
    setSlug: (state, action: PayloadAction<string>) => {
      state.slug = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    toggleEditing: state => {
      if (state.editing === undefined) {
        state.editing = true;
        state.editingSlug = state.slug;
      } else {
        state.editing = undefined;
        state.editingSlug = undefined;
      }
    },
    currySlug: state => {
      state.editingSlug = state.slug;
      // This will be dispatched after we're sure that
      // the post has been saved and is being edited.
    }
  }
});

export const { reset, initializeNewPost, setSlug, setTitle, toggleEditing, currySlug } = writingSlice.actions;

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