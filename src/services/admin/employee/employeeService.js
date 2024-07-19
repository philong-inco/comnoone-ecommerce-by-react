import { get, post, del, patch, put } from '../../../utils/request.js';

export const getAll = async (page) => {
    try {
        const result = await get(`/all?page=${page}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employee filter:', error);
        throw error;
    }
};

export const searchNhanVienKeyWord = async (page, searchKeyWord) => {
    try {
        const result = await get(`/nhan_vien/search`, {
            params: {
                page: page,
                search: searchKeyWord
            }
        });
        return result;
    } catch (error) {
        console.error('Error fetching search Employee filter:', error);
        throw error;
    }
};

export const searchTrangThai = async (page, searchRadio) => {
    try {
        const result = await get(`/nhan_vien/search`, {
            params: {
                params: {
                    page: page,
                    trangThai: searchRadio
                  }
            }
        });
        return result;
    } catch (error) {
        console.error('Error fetching search Employee filter:', error);
        throw error;
    }
};

export const deleteNhanVien = async (id) => {
    try {
        const result = await put(`/nhan_vien/remove/${id}`, {          
        });
        return result;
    } catch (error) {
        console.error('Error fetching search Employee filter:', error);
        throw error;
    }
};

export const rollBackStatus = async (id) => {
    try {
        const result = await put(`/nhan_vien/rollBackStatus/${id}`, {          
        });
        return result;
    } catch (error) {
        console.error('Error fetching search Employee filter:', error);
        throw error;
    }
};