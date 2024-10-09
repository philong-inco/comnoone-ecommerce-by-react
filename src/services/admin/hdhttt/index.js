import { get, post, patch, put, del, del2 } from 'utils/request';

export const getAllHistoryPaymentByBillCode = async (billCode) => {
  try {
    const result = await get(`hoa-don-httt/all/bill/${billCode}`);
    return result;
  } catch (error) {
    console.error('Error fetching bill filter:', error);
    throw error;
  }
};

export const addPaymentHistory = async (billCode, data) => {
  try {
    const result = await post(`hoa-don-httt/create/bill/${billCode}`, data);
    return result;
  } catch (error) {
    console.error('Error creating addPaymentHistory :', error);
    throw error;
  }
};

export const deleteHDHTT = async (id) => {
  console.log(id);

  try {
    const result = await del2(`hoa-don-httt/delete/${id}`);
    return result;
  } catch (error) {
    console.log('Error Delete :', error);
    throw error;
  }
};
