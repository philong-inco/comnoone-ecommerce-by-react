import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/';

export const listDotGiamGia = (filters) => {
  const { page = 0, size = 6, ...restFilters } = filters;
  const queryParams = new URLSearchParams({
    ...restFilters,
    page,
    size
  }).toString();
  return axios.get(`http://localhost:8080/api/v1/discounts/all?${queryParams}`);
};

export const themDotGiamGia = async (data) => {
  await axios.post(`${BASE_URL}/discounts/add`, data);
};
export const getDataProducts = async (page, pageSize) => {
  const url = `http://localhost:8080/api/san-pham/find-status-page?status=1&page=${page}&size=${pageSize}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Network response was not ok: ${errorDetails}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
};

export const getDGGPage = async (page, size) => {
  try {
    size = 6;
    const result = await get(`http://localhost:8080/api/v1/discounts?page=${page - 1}&size=${size}`);
    return result;
  } catch (error) {
    console.log('Error get :');
    throw error;
  }
};

export const getDataProductsDetail = async (idSanPham) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-product-id`, {
      params: {
        idProduct: idSanPham
      }
    });
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    throw new Error('Không thể tải chi tiết sản phẩm.');
  }
};

export const stopDPGG = async (id) => {
  debugger;
  try {
    const result = await axios.put(`http://localhost:8080/api/v1/discounts/changestatusStop/${id}`);
    return result;
  } catch (error) {
    console.log('Error put :', error);
    throw error;
  }
};

export const startDGG = async (id) => {
  debugger;
  try {
    const result = await axios.put(`http://localhost:8080/api/v1/discounts/changestatusStart/${id}`);
    return result;
  } catch (error) {
    console.log('Error put :', error);
    throw error;
  }
};

export const deleteDGG = async (id) => {
  debugger;
  try {
    const result = await axios.put(`http://localhost:8080/api/v1/discounts/changestatusdelete/${id}`);
    return result;
  } catch (error) {
    console.log('Error put :', error);
    throw error;
  }
};
