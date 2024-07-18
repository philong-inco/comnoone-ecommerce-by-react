import { get, post, del, patch, put } from '../utils/request';

export const getBillFilter = async (page, size, path) => {
  try {
    const result = await get(`v1/bills/all?page=${page}&size=${size}&sort=id,DESC&filter=${path}`);

    return result;
  } catch (error) {
    console.error('Error fetching bill filter:', error);
    throw error;
  }
};
export const getBillById = async (id) => {
  try {
    const result = await get(`v1/bills/${id}`);

    return result;
  } catch (error) {
    console.error('Error fetching bill history:', error);
    throw error;
  }
};

export const createBill = async () => {
  try {
    const result = await post('v1/bills/create');
    return result;
  } catch (error) {
    console.error('Error creating :');
    throw error;
  }
};
// lịch sử hóa đơn
export const getBillHistoryByBillId = async (id) => {
  try {
    const result = await get(`v1/bills/bill-history/${id}`);

    return result;
  } catch (error) {
    console.error('Error fetching bill history:', error);
    throw error;
  }
};

// quay lại trạng thái
export const revertBillStatus = async (id) => {
  try {
    const result = await post(`v1/bills/bill-history/${id}/revert-status`);
    return result;
  } catch (error) {
    console.error('Error creating room:');
    throw error;
  }
};
