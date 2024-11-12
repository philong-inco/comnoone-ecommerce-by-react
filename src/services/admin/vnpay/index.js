import { get, post, patch, put, del, del2 } from 'utils/request';

export const createVNPay = async (id, amount) => {
  try {
    const result = await post(`payment-methods/admin/vn-pay/${id}?amount=${amount}`);
    return result;
  } catch (error) {
    console.error('Error fetching bill :', error);
    throw error;
  }
};
