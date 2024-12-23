import { del, get, post } from 'utils/request';

export const createSerialNumberSold = async (data) => {
  try {
    const result = await post(`serial-number-sold`, data);
    return result;
  } catch (error) {
    console.error('Error create all:', error);
    throw error;
  }
};

export const createSerialNumberSoldByProductCode = async (data) => {
  try {
    const result = await post(`serial-number-sold/create-by-product-code`, data);
    return result;
  } catch (error) {
    console.error('Error create all:', error);
    throw error;
  }
};

export const getAllSerialNumberSoldByBillId = async (codeBill) => {
  try {
    const result = await get(`serial-number-sold?code=${codeBill}`);
    return result;
  } catch (error) {
    console.error('Error get all:', error);
    throw error;
  }
};

export const deletedById = async (billCodeRequest, serialNumberIdsRequest) => {
  try {
    const result = await post(`serial-number-sold/delete`, {
      billCode: billCodeRequest,
      serialNumberIds: serialNumberIdsRequest
    });
    return result;
  } catch (error) {
    console.error('Error del all:', error);
    throw error;
  }
};
