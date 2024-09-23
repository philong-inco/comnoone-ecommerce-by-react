import { get, post, patch, put, del, del2 } from 'utils/request';

export const getAllSerialNumberByProductId = async (productId, page, size) => {
  try {
    const result = await get(`serial-number/product-detail/${productId}?status=0&page=${page}&size=${size}`);
    return result;
  } catch (error) {
    console.error('Error fetching serial number by product id :', error);
    throw error;
  }
};

export const getAllSerialNumberByProductId2 = async (productId, page, size) => {
  try {
    const result = await get(`serial-number/product-detail-/${productId}?page=${page}&size=${size}`);
    return result;
  } catch (error) {
    console.error('Error fetching serial number by product id :', error);
    throw error;
  }
};
