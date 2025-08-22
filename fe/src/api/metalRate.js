import axios from 'axios';
const API = axios.create({ baseURL: `https://metal-rate-app.onrender.com/api/metalRates` });

const authConfig = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getLatestRate = (token, metal, purityId) =>
  API.get('/latest', {
    ...authConfig(token),
    params: { metal, purityId }
  }).then(r => r.data);

export const createRate = (token, data) =>
  API.post('/', data, authConfig(token)).then(r => r.data);

export const listRates = (token, { metal, purityId, page, limit }) =>
  API.get('/', {
    ...authConfig(token),
    params: { metal, purityId, page, limit }
  }).then(r => r.data);

