import pages from 'menu-items/daXoa/pages.js';
import { get, post, del, patch, put } from '../../../utils/request.js';

export const getAll = async (page) => {
    try {
        const result = await get(`/khachhang/all?page=${page}`);
        return result;
    } catch (error) {
        console.log('Error  fetching Custommer', error);
        throw error;
    }
}

export const getSearchKeyWord = async (page, keyWord) => {
    try {
        const result = await get(`/khachhang/search?page=${page}&search=${keyWord}`);
        return result;
    } catch (error) {
        console.log('Error  fetching Custommer by keyword', error);
    }
}

export const getsearchGioiTinh = async (page, gioiTinh) => {
    try {
        const result = await get(`/khachhang/searchgioitinh?page=${page}&gioiTinh=${selectGioiTinh}`);
        return result;
    } catch (error) {
        console.log('Error  fetching Custommer by keyword', error);
    }
}


