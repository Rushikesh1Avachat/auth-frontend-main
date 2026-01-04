import axios from 'axios';
import { storage } from '../utils/storage';

let refreshToken = storage.get('refreshToken');
let accessToken = storage.get('accessToken');

export const getToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

export const setToken = (newToken) => {
  return newToken;
};

export const generateTokensFromAccessToken = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5500/api/auth/refresh-token',
      {
        refreshToken,
      }
    );
    setToken(response.data.accessToken);
    storage.set('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.log(error, 'from the error accesstoken');
    throw error;
  }
};
