import { Post } from '.prisma/client';
import axios from 'axios';


// TODO
// ...
// Can we not just use prisma here?
// EDIT: yes.
// ...
// TODO

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const upsert = async (obj: { slug: string, content: string, title: string }) => {
  if (token === null) return; // TODO HANDLE
  const config = {
    headers: { Authorization: token }
  };
  try {
    const res = await axios.post('/api/posts/create', obj, config);
    return res.data as Post;
  } catch (e: any) {
    return { message: e.message };
  }
};

const getPost = async (slug: string) => {
  const res = await axios.get(`/api/posts/${slug}`);  // This does literally nothing right now.
  return res.data as Post;
};

const getAll = async () => {
  const res = await axios.get(`/api/posts/`);
  return res.data as Post[];
};

// const del = async id => {
//   const config = {
//     headers: { Authorization: token }
//   };

//   await axios.delete(`${baseUrl}/${id}`, config);
// };

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



const exp = {
  upsert,
  setToken,
  getPost,
  getAll
};

export default exp;