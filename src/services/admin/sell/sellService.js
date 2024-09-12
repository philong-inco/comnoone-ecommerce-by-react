import { get, post, patch, put, del, del2 } from 'utils/request';

export const getBillCodes = async () => {
  try {
    const result = await get(`sell/bill-codes`);
    return result;
  } catch (error) {
    console.error('Error fetching sell get bill codes:', error);
    throw error;
  }
};

export const deleteBillByCode = async (code) => {
  try {
    const result = await del(`sell/delete/${code}`);
    return result;
  } catch (error) {
    console.error('Error delete bill by code:', error);
    throw error;
  }
};
