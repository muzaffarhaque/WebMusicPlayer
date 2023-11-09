// axios-interceptor.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_END_POINT,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(config)
    const authToken='';
    config.headers['Authorization'] = `Bearer ${authToken}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// console.log('Base URL:', JSON.stringify(import.meta.env.VITE_REACT_END_POINT)); 

export default axiosInstance;
