import axios from 'axios';

export const Backend = axios.create({
  baseURL: 'http://localhost:8000', // Backend URL
});

export const api = axios.create({
  baseURL:''
})