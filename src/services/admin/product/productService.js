import { get } from "utils/request";

const handleUnauthorizedError = () => {
  localStorage.removeItem('COMNOONE_TOKEN');
  window.location.href = '/login';
};

export const getAllProduct = async (page, size) => {
  try {
    const result = await get(`san-pham-chi-tiet/all?page=${page}&size=${size}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error get all products:', error);
    throw error;
  }
};

export const getAllListProduct = async () => {
  try {
    const result = await get(`/san-pham/all-list`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error getting all products:', error);
    return { data: { data: [] } };
  }
};

export const getTopFiveProductSold = async (startDate, endDate) => {
  try {
    const result = await get(`/serial-number-sold/topsold?startDate=${startDate}&endDate=${endDate}`);
    console.log(result + " getTopFive");
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error getting top 5 products sold:', error);
    return { data: { data: [] } };
  }
};

export const infoBillByDate = async (startDate, endDate) => {
  try {
    const result = await get(`/bills/dashboard/infobill?startDate=${startDate}&endDate=${endDate}`);
    console.log(result + " Info Bill");
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error getting information of bill:', error);
    return { data: { data: [] } };
  }
};

export const totalPriceToday = async () => {
  try {
    const result = await get(`/bills/dashboard/totalpricenow`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error getting total price today:', error);
    return { data: { data: [] } };
  }
};

export const totalpriceByDate = async (startDate, endDate) => {
  try {
    const result = await get(`/bills/dashboard/totalprice?startDate=${startDate}&endDate=${endDate}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error getting total price by date:', error);
    return { data: { data: [] } };
  }
};

export const countBill = async (startDate, endDate) => {
  try {
    const result = await get(`/bills/countbill?startDate=${startDate}&endDate=${endDate}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error counting bills:', error);
    return { data: { data: [] } };
  }
};

export const countProduct = async (startDate, endDate) => {
  try {
    const result = await get(`/bills/dashboard/sumproductsoldout?startDate=${startDate}&endDate=${endDate}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error counting products:', error);
    return { data: { data: [] } };
  }
};

export const trangThaiHoaDonCalulate = async (startDate, endDate) => {
  try {
    const result = await get(`/bills/dashboard/calculatebillpercentage?startDate=${startDate}&endDate=${endDate}`);
    console.log(result);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error calculating bill status:', error);
    return { data: { data: [] } };
  }
};

export const countCustomerByDate = async (startDate, endDate) => {
  try {
    const result = await get(`/khachhang/countcustomerbydate?startDate=${startDate}&endDate=${endDate}`);
    console.log(result);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error counting customers by date:', error);
    return { data: { data: [] } };
  }
};
