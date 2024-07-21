import { get, post, del, patch, put } from '../../../utils/request.js';

export const getAll = async (page) => {
    try {
        const result = await get(`/nhan_vien/all?page=${page}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees:', error);
        throw error;
    }
};

export const searchNhanVienKeyWord = async (page, searchKeyWord) => {
    try {
        const result = await get(`/nhan_vien/search?page=${page}&search=${searchKeyWord}`
        );
        return result;
    } catch (error) {
        console.error('Error fetching Employees by keyword:', error);
        throw error;
    }
};

export const searchTrangThai = async (page, searchRadio) => {
    try {
        const result = await get(`/nhan_vien/searchtrangthai?page=${page}&trangThai=${searchRadio}`
        );
        return result;
    } catch (error) {
        console.error('Error fetching Employees by status:', error);
        throw error;
    }
};

export const deleteNhanVien = async (id) => {
    try {
        const result = await put(`/nhan_vien/remove/${id}`);
        return result;
    } catch (error) {
        console.error('Error deleting Employee:', error);
        throw error;
    }
};

export const rollBackStatus = async (id) => {
    try {
        const result = await put(`/nhan_vien/rollBackStatus/${id}`);
        return result;
    } catch (error) {
        console.error('Error rolling back Employee status:', error);
        throw error;
    }
};
