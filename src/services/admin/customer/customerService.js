import { get, post, del, patch, put } from '../../../utils/request.js';

export const getAll = async (page) => {
    try {
        const result = await get(`/khachhang/all?pageNo=${page}`);
        return result;
    } catch (error) {
        console.log('Error  fetching Custommer', error);
        throw error;
    }
}

export const getDanhSachKhachHang = async () => {
    try {
        const result = await get('/khachhang/danhsachkhachhang');
        return result;
    } catch (error) {
        console.log('Error fetching DanhSachKhachHang', error);
    }
}

export const getSearchKeyWord = async (page, keyWord) => {
    try {
        const result = await get(`/khachhang/search?pageNo=${page}&search=${keyWord}`);
        return result;
    } catch (error) {
        console.log('Error  fetching Custommer by keyword', error);
    }
}

export const getSearchGioiTinh = async (page, gioiTinh) => {
    try {
        const result = await get(`/khachhang/searchgioitinh?pageNo=${page}&gioiTinh=${gioiTinh}`);
        return result;
    } catch (error) {
        console.log('Error  fetching Custommer by keyword', error);
    }
}

export const getSelectHangKhachHang = async (page, hangKhachHang) => {
    try {
        const result = await get(`/khachhang/searchhangkhachhang?pageNo=${page}&hangKhachHang=${hangKhachHang}`);
        return result;
    } catch (error) {
        console.log('Error  fetching Custommer by keyword', error);
    }
}


