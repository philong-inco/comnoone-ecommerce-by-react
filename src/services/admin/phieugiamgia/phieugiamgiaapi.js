import { get, post, del, patch, put } from '../../../utils/request.js';

export const getAllDanhSachPhieu = async (page) => {
    try {
        const result = await get(`http://localhost:8080/api/v1/coupons?page=${page}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees:', error);
        throw error;
    }
}

export const getDetailDanhSachPhieu = async (id) => {
    try {
        const result = await get(`http://localhost:8080/api/v1/coupons/detail/${id}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees:', error);
        throw error;
    }
}

export const deletePhieuGiamGia = async (id) => {
    try {
        const result = await get(`/api/v1/coupons/delete/id=${id}`);
        return result;
    } catch (error) {
        console.log(error);
    }
}