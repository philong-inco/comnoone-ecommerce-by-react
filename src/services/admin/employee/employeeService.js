import { get, post, del, patch, put } from '../../../utils/request.js';

export const getAll = async (pageNo) => {
    try {
        const result = await get(`/nhan_vien/all?pageNo=${pageNo}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees:', error);
        throw error;
    }
};

export const getDanhSachNhanVien = async () => {
    try {
        const result = await get(`/nhan_vien/danhsachnhanvien`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees:', error);
        throw error;
    }
};

export const searchNhanVienKeyWord = async (page, size, searchKeyWord) => {
    try {
        const result = await get(`/nhan_vien/search?pageNo=${page}&search=${searchKeyWord}`
        );
        return result;
    } catch (error) {
        console.error('Error fetching Employees by keyword:', error);
        throw error;
    }
};

export const searchTrangThai = async (page, size, searchRadio) => {
    try {
        debugger;
        const result = await get(`/nhan_vien/searchtrangthai?pageNo=${page}&trangThai=${searchRadio}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees by status:', error);
        throw error;
    }
};

export const searchGioiTinh = async (page, size, selectGioiTinh) => {
    try {
        debugger;
        const result = await get(`/nhan_vien/searchgioitinh?pageNo=${page}&gioiTinh=${selectGioiTinh}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees by sex:', error);
        throw error;
    }
};

export const searchYearOfEmplpyee = async (page, searchYear) => {
    try {
        debugger;
        const result = await get(`/nhan_vien/searchyear?pageNo=${page}&year=${searchYear}`);
        return result;
    } catch (error) {
        console.error('Error fetching Employees by Year:', error);
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

export const sentEmailForgotPassword = async (email) => {
    try {
        debugger;
        const result =  await get(`/nhan_vien/sendemailforgotpassword/${email}`)

    } catch (error) {
        console.log("Error sent email password");
        throw error;
    }
}