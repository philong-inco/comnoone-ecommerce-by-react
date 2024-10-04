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
