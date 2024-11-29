import axios from 'axios';
import { backEndUrl } from '../utils/back-end';

const axiosInstance = axios.create({
  baseURL: backEndUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('COMNOONE_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const get = async (path) => {
  try {
    const response = await axiosInstance.get(path);
    return response;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

export const post = async (path, data) => {
  try {
    const response = await axiosInstance.post(path, data);
    return response;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

export const put = async (path, data) => {
  try {
    const response = await axiosInstance.put(path, data);
    return response;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};

export const del = async (path) => {
    try {
      const response = await axiosInstance.get(path);
      return response;
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  };
