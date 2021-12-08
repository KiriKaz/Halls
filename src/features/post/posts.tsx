import { Post } from '.prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Post[] = [];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: state => initialState,
    addPost: (state, action: PayloadAction<Post>) => {
      state.push(action.payload);
    },
    setPosts: (state, action: PayloadAction<Post[]>) => action.payload,
    removePostById: (state, action: PayloadAction<string>) => {
      return state.filter(post => post.slug !== action.payload); // TODO change to ID after database remodel
    }
  }
});

export const { reset, addPost, setPosts, removePostById } = postsSlice.actions;

export default postsSlice.reducer;


// TODO this entire thing needs to be redone/undone. Not sure we need to cache posts into Redux at all if we're grabbing them with Prisma directly, but it can certainly act as a buffer. I don't have the space to visualize this yet though.