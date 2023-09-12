import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export { api };
