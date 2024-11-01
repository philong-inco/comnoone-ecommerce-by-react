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

export const getAllListProduct = async () => {
  try {
    const result = await get(`/san-pham/all-list`);
    return result;
  } catch (error) {
    console.error('Error getting all products:', error);
    return { data: { data: [] } };
  }
};

export const getTopFiveProductSold = async (startDate, endDate) => {
  try {
    const result = await get(`/serial-number-sold/topsold?startDate=${startDate}&endDate=${endDate}`);
    return result;
  } catch (error) {
    console.error('Error getting top 5 products sold:', error);
    return { data: { data: [] } };
  }
};

export const infoBillByDate = async (startDate, endDate) => {
  try {
    const result = await get(`/bills/dashboard/infobill?startDate=${startDate}&endDate=${endDate}`);
    console.log(result);   
    return result;
  } catch (error) {
    console.error('Error getting information of bill:', error);
    return { data: { data: [] } };
  }
};

export const totalPriceToday = async () => {
  try {
    const result = await get(`/bills/dashboard/totalpricenow`);
    return result;
  } catch (error) {
    console.error('Error getting information of bill:', error);
    return { data: { data: [] } };
  }
};

export const totalpriceByDate = async (startDate, endDate) => {
  try {
    const result = await get(`/bills/dashboard/totalprice?startDate=${startDate}&endDate=${endDate}`);
    return result;
  } catch (error) {
    console.error('Error getting information of bill:', error);
    return { data: { data: [] } };
  }
};

export const countBill = async (startDate, endDate) => {
  try {
    debugger;
    const result = await get(`/bills/countbill?startDate=${startDate}&endDate=${endDate}`);
    return result;
  } catch (error) {
    console.error('Error getting information of bill:', error);
    return { data: { data: [] } };
  }
};

export const countProduct = async (startDate, endDate) => {
  try {
    debugger;
    const result = await get(`/bills/dashboard/sumproductsoldout?startDate=${startDate}&endDate=${endDate}`);
    return result;
  } catch (error) {
    console.error('Error getting information of bill:', error);
    return { data: { data: [] } };
  }
};