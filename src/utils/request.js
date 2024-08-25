import axios from 'axios';
const API_DOMAIN = 'http://localhost:8080/api/';

const axiosInstance = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getToken()
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error),
// )

export const get = async (path) => {
  try {
    const response = await axiosInstance.get(path);
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

export const post = async (path, data) => {
  try {
    const response = await axiosInstance.post(path, data);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

export const del = async (path) => {
  try {
    const response = await axiosInstance.delete(path);
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
};

export const patch = async (path, data) => {
  try {
    const response = await axiosInstance.patch(path, data);
    return response.data;
  } catch (error) {
    console.error('PATCH request error:', error);
    throw error;
  }
};

export const put = async (path, data) => {
  try {
    const response = await axiosInstance.put(path, data);
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};
