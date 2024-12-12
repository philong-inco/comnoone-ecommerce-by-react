import { get, post, put } from '../../../utils/request.js';

export const listDotGiamGia = async (filters) => {
    try {
        const { page = 0, size = 5, ...restFilters } = filters;
        const queryParams = new URLSearchParams({
            ...restFilters,
            page,
            size,
        }).toString();
        const result = await get(`v1/discounts/all?${queryParams}`);
        return result;
    } catch (error) {
        console.error('Error fetching discount list:', error);
        throw error;
    }
};

export const themDotGiamGia = async (data) => {
    try {
        const result = await post(`v1/discounts/add`, data);
        return result;
    } catch (error) {
        console.error('Error adding discount period:', error);
        throw error;
    }
};

export const getDataProducts = async (page, pageSize) => {
    try {
        const result = await get(`san-pham/find-status-page?status=1&page=${page}&size=${pageSize}`);
        return result;
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
};

export const getDGGPage = async (page, size = 6) => {
    try {
        const result = await get(`v1/discounts?page=${page - 1}&size=${size}`);
        return result;
    } catch (error) {
        console.error('Error fetching discount page:', error);
        throw error;
    }
};

export const getDataProductsDetail = async (idSanPham) => {
    try {
      const response = await get(`san-pham-chi-tiet/get-by-product-id?idProduct=${idSanPham}`)
        return response;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw new Error('Không thể tải chi tiết sản phẩm.');
    }
};

export const stopDPGG = async (id) => {
    try {
        const result = await put(`v1/discounts/changestatusStop/${id}`);
        debugger;
        return result;
    } catch (error) {
        console.error('Error stopping discount period:', error);
        throw error;
    }
};

export const startDGG = async (id) => {
    try {
        const result = await put(`v1/discounts/changestatusStart/${id}`);
        return result;
    } catch (error) {
        console.error('Error starting discount period:', error);
        throw error;
    }
};

export const deleteDGG = async (id) => {
    try {
        const result = await put(`v1/discounts/changestatusdelete/${id}`);
        return result;
    } catch (error) {
        console.error('Error deleting discount period:', error);
        throw error;
    }
};

export const CheckStatus = async () => {
    try {
        const result = await put(`v1/discounts/checkupdatestatus`);
        return result;
    } catch (error) {
        console.error('Error checking status:', error);
        throw error;
    }
};

export const updateDotGiamGia = async (id, data) => {
  try {
    const response = await put(`v1/discounts/update/${id}`, data);
    return response;
  } catch (error) {
    console.log('Error updating discount:', error);
    throw error;
  }
};