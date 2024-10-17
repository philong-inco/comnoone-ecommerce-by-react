import { get, post, patch, put, del, del2 } from 'utils/request';

export const getBillFilter = async (page, size, path) => {
  console.log('Path : ', path);

  try {
    const result = await get(`bills/all?page=${page}&size=${size}&sort=id,DESC&filter=${path}`);
    return result;
  } catch (error) {
    console.error('Error fetching bill filter:', error);
    throw error;
  }
};
export const getBillById = async (id) => {
  try {
    const result = await get(`bills/${id}`);

    return result;
  } catch (error) {
    console.error('Error fetching bill :', error);
    throw error;
  }
};

export const getBillByCode = async (code) => {
  try {
    const result = await get(`bills/code/${code}`);
    return result;
  } catch (error) {
    console.error('Error fetching bill by code :', error);
    throw error;
  }
};

export const createBill = async () => {
  try {
    const result = await post('bills/create');
    return result;
  } catch (error) {
    console.error('Error creating :', error);
    throw error;
  }
};

export const addCustomerToBill = async (customerId, codeBill) => {
  try {
    const result = await post(`bills/add-customer-to-bill?customerId=${customerId}&codeBill=${codeBill}`);
    return result;
  } catch (error) {
    console.error('Error creating addCustomerToBill :', error);
    throw error;
  }
};

export const addCouponToBill = async (couponId, codeBill) => {
  try {
    const result = await post(`bills/add-coupon-by-id?couponId=${couponId}&codeBill=${codeBill}`);
    return result;
  } catch (error) {
    console.error('Error creating addCouponToBill :', error);
    throw error;
  }
};

export const addCouponToBillByCode = async (couponCode, codeBill) => {
  try {
    const result = await post(`bills/add-coupon-by-code?couponCode=${couponCode}&codeBill=${codeBill}`);
    return result;
  } catch (error) {
    console.error('Error creating addCouponToBillByCode :', error);
    throw error;
  }
};

export const updateStatusByCode = async (code, status, data) => {
  try {
    const result = await post(`bills/update-status/${code}?status=${status}`, data);
    return result;
  } catch (error) {
    console.error('Error update bill by code :', error);
    throw error;
  }
};

export const changeStatusByCode = async (code, status) => {
  try {
    const result = await post(`bills/change-status/${code}?status=${status}`);
    return result;
  } catch (error) {
    console.error('Error change status bill by code :', error);
    throw error;
  }
};

export const payCounter = async (billCode, data) => {
  console.log('Data request : ', data);

  try {
    const result = await post(`bills/pay-counter/${billCode}`, data);
    return result;
  } catch (error) {
    console.error('Error pay counter by code :', error);
    throw error;
  }
};

export const updateAddressInBill = async (billCode, data) => {
  try {
    const result = await post(`bills/update-address-in-bill/${billCode}`, data);
    return result;
  } catch (error) {
    console.error('Error pay counter by code :', error);
    throw error;
  }
};

// lịch sử hóa đơn
export const getBillHistoryByBillId = async (id) => {
  try {
    const result = await get(`bills/bill-history/${id}`);

    return result;
  } catch (error) {
    console.error('Error fetching bill history:', error);
    throw error;
  }
};

// quay lại trạng thái
export const revertBillStatus = async (code) => {
  try {
    const result = await post(`bills/bill-history/${code}/revert-status`);
    return result;
  } catch (error) {
    console.error('Error revert Bill Status : ');
    throw error;
  }
};

export const getPDF = async (code) => {
  try {
    const result = await get(`bills/order-pdf/${code}`, {
      headers: {
        'Content-Type': 'application/pdf'
        // 'Authorization': 'Bearer your_token_here' // Thêm Authorization nếu cần
      }
    });
    return result;
  } catch (error) {
    console.error('Error fetching pdf by code:', error);
    throw error;
  }
};

export const listHangBill = async () => {
  try {
    const result = await get(`bills/list-hang-bill`);
    return result;
  } catch (error) {
    console.error('Error fetching hang bill code:', error);
    throw error;
  }
};
