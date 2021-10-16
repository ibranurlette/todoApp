import axios from 'axios';

export const API = axios.create({
  baseURL: `http://192.168.1.6:8000/v1/`,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});
