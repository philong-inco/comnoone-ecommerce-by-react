import { get, post, del, patch, put } from '../../../utils/request.js';

export const getAll = async (page) => {
  try {
    const result = await get(`/khachhang/all?pageNo=${page}`);
    return result;
  } catch (error) {
    console.log('Error  fetching Custommer', error);
    throw error;
  }
};

export const fetchSearchCustomer = async (search, page) => {
  try {
    const result = await get(`khachhang/search?search=${search}&pageNo=${page}`);
    return result;
  } catch (error) {
    console.log('Error  search Custommer', error);
    throw error;
  }
};

export const getAllChangePageSize = async (page, size) => {
  try {
    const result = await get(`/khachhang/all?pageNo=${page}&pageSize=${size}`);
    return result;
  } catch (error) {
    console.log('Error fetching Customer', error);
    throw error;
  }
};

export const getDanhSachKhachHang = async () => {
  try {
    const result = await get('/khachhang/danhsachkhachhang');
    return result;
  } catch (error) {
    console.log('Error fetching DanhSachKhachHang', error);
  }
};

export const getSearchKeyWord = async (page, keyWord) => {
  try {
    const result = await get(`/khachhang/search?pageNo=${page}&search=${keyWord}`);
    return result;
  } catch (error) {
    console.log('Error  fetching Custommer by keyword', error);
  }
};

export const getSearchGioiTinh = async (page, gioiTinh) => {
  try {
    const result = await get(`/khachhang/searchgioitinh?pageNo=${page}&gioiTinh=${gioiTinh}`);
    return result;
  } catch (error) {
    console.log('Error  fetching Custommer by keyword', error);
  }
};

export const getSelectHangKhachHang = async (page, hangKhachHang) => {
  try {
    const result = await get(`/khachhang/searchhangkhachhang?pageNo=${page}&hangKhachHang=${hangKhachHang}`);
    return result;
  } catch (error) {
    console.log('Error  fetching Custommer by keyword', error);
  }
};

export const findCustomerByPhone = async (phone) => {
  try {
    const result = await get(`khachhang/phone-number/${phone}`);
    return result;
  } catch (error) {
    console.log('Error  find customer by phone number : ', error);
  }
};

export const updateInfoKhachHang = async (id, updatedData) => {
  try {
      const result = await put(`khachhang/update/${id}`, updatedData, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      return result;
  } catch (error) {
      if (error.response && error.response.status === 401) {
          handleUnauthorizedError();
      }
      console.log('Update Khach Hang : ', error);
      throw error;
  }
};
