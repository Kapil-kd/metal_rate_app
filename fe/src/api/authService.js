import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.REACT_APP_SERVER}/api` });

export const signup = (userData) => API.post('/auth/signup', userData);
export const login = (credentials) => API.post('/auth/login', credentials);

export const verifylogin = (token) =>
  API.get(`/auth/loginverify`, { headers: { Authorization: `Bearer ${token}` } });

export const Logoutfn = (token) =>
  API.get(`/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });