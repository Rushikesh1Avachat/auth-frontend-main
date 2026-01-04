import axios from 'axios';
import {
  generateTokensFromAccessToken,
  getRefreshToken,
} from '../services/authService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500/api/auth',
  withCredentials: true,
  // Include credential (Cookie)
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = JSON.parse(localStorage.getItem('accessToken'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response =', response);
    return response;
  },
  async (error) => {
    console.log('error =', error);

    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        originalRequest._retry = true;
        try {
          const newToken = await generateTokensFromAccessToken();
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
