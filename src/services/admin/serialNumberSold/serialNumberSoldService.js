import { del, get, post } from 'utils/request';

export const createSerialNumberSold = async (data) => {
  try {
    const result = await post(`v1/serial-number-sold`, data);
    return result;
  } catch (error) {
    console.error('Error create all:', error);
    throw error;
  }
};

export const getAllSerialNumberSoldByBillId = async (codeBill) => {
  try {
    const result = await get(`v1/serial-number-sold?code=${codeBill}`);
    return result;
  } catch (error) {
    console.error('Error get all:', error);
    throw error;
  }
};

export const deletedById = async (id) => {
  try {
    const result = await del(`v1/serial-number-sold/${id}`);
    return result;
  } catch (error) {
    console.error('Error del all:', error);
    throw error;
  }
};
