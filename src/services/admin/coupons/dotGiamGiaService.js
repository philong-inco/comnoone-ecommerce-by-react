import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const listDotGiamGia = (filters) => {
    const { page = 0, size = 5, ...restFilters } = filters;
    const queryParams = new URLSearchParams({
        ...restFilters,
        page,
        size,
    }).toString();
    return axios.get(`http://localhost:8080/api/v1/discounts/all?${queryParams}`);
};

export const themDotGiamGia = async (data) => {
    await axios.post(`${BASE_URL}/discounts/add`, data);
};
export const getDataProducts = async (page, pageSize) => {
    const url = `http://localhost:8080/api/san-pham/all?page=${page}&pageSize=${pageSize}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Network response was not ok: ${errorDetails}`);
        }
        return await response.json();
    } catch (error) {
        // Xử lý lỗi chung
        console.error('Error fetching product data:', error);
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

