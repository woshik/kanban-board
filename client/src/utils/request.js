import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_URL}`,
  timeout: 60000,
});

service.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default service;
