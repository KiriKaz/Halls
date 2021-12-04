import { Post } from '.prisma/client';
import axios from 'axios';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const create = async (obj: { slug: string, content: string, userId: string }) => {
  if (token === null) return; // TODO HANDLE
  const config = {
    headers: { Authorization: token }  // TODO DOES FUCKING NOTHING
  };
  const res = await axios.post('/api/posts/create', obj, config);
  return res.data;
};

// const comment = async (id, comment) => {
//   const res = await axios.post(`${baseUrl}/${id}/comments`, { text: comment });
//   return res.data;
// };

// const like = async blog => {
//   const config = {
//     headers: { Authorization: token }
//   };
//   blog = { ...blog, likes: blog.likes + 1, user: blog.user.id };

//   const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
//   return res.data;
// };

// const del = async id => {
//   const config = {
//     headers: { Authorization: token }
//   };

//   await axios.delete(`${baseUrl}/${id}`, config);
// };


const exp = {
  create,
  setToken
};

export default exp;