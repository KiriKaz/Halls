import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserService } from '../../services/userService';
import { AppDispatch, RootState } from '../../store';

import client from '../../lib/prisma';

import postService from '../../services/postService';

import type { SessionToken } from '../../types';

const initialState: SessionToken = {
  id: null,
  username: null,
  token: null,
  pfp: null
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUserRaw: (state, action: PayloadAction<SessionToken>) => {
      return action.payload;
    },
    rawLogout: state => {
      return initialState;
    },
    setPfpRaw: (state, action: PayloadAction<string | null>) => {
      if (state.token === null || action.payload === null) return state;
      state.pfp = action.payload;
    }
  }
});

export const { setUserRaw, rawLogout, setPfpRaw } = sessionSlice.actions;

export const initializeUser = () => async (dispatch: AppDispatch) => {
  const loggedInUserJSON = window.localStorage.getItem('sessionToken');

  if (loggedInUserJSON) {
    const usr = JSON.parse(loggedInUserJSON);
    postService.setToken(usr.token);
    dispatch(setUserRaw(usr));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  window.localStorage.removeItem('sessionToken');
  dispatch(rawLogout());
};

export const setPfp = ({ pfp }: { pfp: string }) => async (dispatch: AppDispatch, getState: RootState) => {
  const storedUser = window.localStorage.getItem('sessionToken');
  if (getState.authentication.token === null || getState.authentication.id === null || storedUser === null) return;
  const usr = await client.user.update({
    where: {
      id: getState.authentication.id
    },
    data: {
      pfp
    }
  });
  console.log(usr);
  window.localStorage.setItem('sessionToken', JSON.stringify({
    ...JSON.parse(storedUser),
    pfp
  }));
  dispatch(setPfpRaw(pfp));
};

export const login = ({ username, password }: { username: string, password: string }) => async (dispatch: AppDispatch) => {
  const usr = await UserService.login(username, password);
  window.localStorage.setItem('sessionToken', JSON.stringify(usr));

  postService.setToken(usr.token);
  dispatch(setUserRaw(usr));
};



export default sessionSlice.reducer;
