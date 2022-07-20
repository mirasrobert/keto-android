import axios from 'axios';

const api = axios.create({
  baseURL: 'https://diabetes-keto.herokuapp.com',
});

export default api;
