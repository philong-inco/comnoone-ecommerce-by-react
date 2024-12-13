import { get, post, patch, put, del, del2 } from 'utils/request';

export const getDefaultAddressByIdCustomer = async (id) => {
  try {
    const result = await get(`diachi/getDiaChiDefauldByIdKhachHang/${id}`);

    return result;
  } catch (error) {
    console.error('Error address :', error);
    throw error;
  }
};


export const defaultLocation = async (idDiaChi, idKhachHang) => {
  try {
    const result = await put(`diachi/defaultlocation/${idDiaChi}?idKhachHang=${idKhachHang}`, null);
    return result;
  } catch (error) {
    console.error('Error address :', error);
    throw error;
  }
};

export const unDefaultLocation = async (idDiaChi, idKhachHang) => {
  try {
    const result = await put(`diachi/undefaultlocation/${idDiaChi}?idKhachHang=${idKhachHang}`, null);
    return result;
  } catch (error) {
    console.error('Error address :', error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const result = await del(`diachi/${id}`);
    return result;
  } catch (error) {
    console.error('Error address :', error);
    throw error;
  }
};

export const getInfoKhachHang = async (id) => {
  try {
    const result = await get(`khachhang/searchbyid/${id}`);
    return result
  } catch (error) {
    console.error('Error KhachHang :', error);
    throw error;
  }
}

export const getAllDiaChiByIdKhachHang = async (id) => {
  try {
    const result = await get(`diachi/getAllDiaChiByIdKhachHang/${id}`);
    return result;
  } catch (error) {
    console.error('Error Dia chi khachHang :', error);
    throw error;
  }
}

export const createDiaChi = async (formDataAddress) => {
  try {
    const result = await post('diachi/create', formDataAddress); // Sử dụng phương thức POST
    return result;
  } catch (error) {
    console.error('Error creating Dia Chi:', error);
    throw error;
  }
};

export const updateDiaChi = async (id_dia_chi, formDataAddress) => {
  try {
    const result = await put(`diachi/updatelocation/${id_dia_chi}`, formDataAddress); // Sử dụng phương thức PUT
    return result;
  } catch (error) {
    console.error('Error updating Dia Chi:', error);
    throw error;
  }
};
