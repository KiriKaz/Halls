import Router from 'next/router';
import axios from 'axios';

// const user = JSON.parse(localStorage.getItem('user') as string);

const login = async (username: string, password: string) => {
  const sessionToken = await axios.post(`/api/users/login`, { username, password });

  localStorage.setItem('sessionToken', JSON.stringify(sessionToken.data));
  Router.push('/');
  return sessionToken.data;
};

const logout = () => {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('sessionToken');
  Router.push('/');
};

const register = async ({ username, password }: { username: string, password: string }) => {
  const res = await axios.post('/api/users/register', { username, password });
  return res;
};

export const UserService = {
  login,
  logout,
  register
};