import { get } from 'utils/request';

export const getAllProduct = async (page, size) => {
  try {
    const result = await get(`san-pham-chi-tiet/all?page=${0}&size=${1000}`);
    return result;
  } catch (error) {
    console.error('Error get all:', error);
    throw error;
  }
};
