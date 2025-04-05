// src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // o la URL de tu backend
});

export const login = async (credentials) => {
  const response = await API.post('/auth/login/', credentials);
  return response.data;
};
