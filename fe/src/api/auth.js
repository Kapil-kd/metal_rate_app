import axios from 'axios';
const API = axios.create({ baseURL: `${process.env.REACT_APP_SERVER}/api/auth` });

export const loginUser = async (username, password) => {
  const res = await API.post('/login', { username, password });
  return res.data.token;
};
