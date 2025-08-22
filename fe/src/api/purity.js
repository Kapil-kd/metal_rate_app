import axios from 'axios';
const API = axios.create({ baseURL: `${process.env.REACT_APP_SERVER}/api/purities` });

export const getPurities = (token) =>
  API.get('/', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const createPurity = (token, data) =>
  API.post('/', data, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const updatePurity = (token, id, data) =>
  API.put(`/${id}`, data, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const deletePurity = (token, id) =>
  API.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
