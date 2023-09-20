import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPessoas = () => {
  return instance.get('/pessoas');
};

export const fetchProdutos = () => {
  return instance.get('/produtos');
};
