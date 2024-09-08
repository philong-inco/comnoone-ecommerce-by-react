import { get, post, patch, put, del, del2 } from 'utils/request';

export const getBillFilter = async (page, size, path) => {
  console.log('Path : ', path);

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
    console.error('Error fetching bill :', error);
    throw error;
  }
};

export const getBillByCode = async (code) => {
  try {
    const result = await get(`v1/bills/code/${code}`);

    return result;
  } catch (error) {
    console.error('Error fetching bill by code :', error);
    throw error;
  }
};

export const createBill = async () => {
  try {
    const result = await post('v1/bills/create');
    return result;
  } catch (error) {
    console.error('Error creating :', error);
    throw error;
  }
};

export const updateStatusByCode = async (code, status) => {
  try {
    const result = await post(`v1/bills/update-status/${code}?status=${status}`);
    return result;
  } catch (error) {
    console.error('Error update bill by code :', error);
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
export const revertBillStatus = async (code) => {
  try {
    const result = await post(`v1/bills/bill-history/${code}/revert-status`);
    return result;
  } catch (error) {
    console.error('Error revert Bill Status : ');
    throw error;
  }
};
