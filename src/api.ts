import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL da sua API
  timeout: 10000, // Tempo limite da solicitação em milissegundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPessoas = () => {
  return instance.get('/pessoas');
};
