import { get, post, put, del, del2 } from 'utils/request';

const handleUnauthorizedError = () => {
  localStorage.removeItem('COMNOONE_TOKEN');
  window.location.href = '/login';
};

export const filterCoupons = async (page, size, path) => {
  try {
    const result = await get(`coupons/all?page=${page - 1}&size=${size}&sort=id,DESC&filter=${path}`);
    console.log(result);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error fetching coupons filter:', error);
    throw error;
  }
};

export const getPGGPage = async (page, size) => {
  try {
    const result = await get(`coupons?page=${page - 1}&size=${size}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error get :');
    throw error;
  }
};

export const getPGGById = async (id) => {
  try {
    const result = await get(`coupons/detail/${id}`);
    console.log('GET response:', result);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error get :');
    throw error;
  }
};

export const createPGG = async (options) => {
  try {
    const result = await post('coupons/add', options);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error creating coupons:', error);
    throw error;
  }
};

export const deletedCoupons = async (id) => {
  try {
    const result = await del(`coupons/delete/${id}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error :', error);
    throw error;
  }
};

export const updatedPGG = async (id, pgg) => {
  try {
    const result = await put(`coupons/update/${id}`, pgg);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.error('Error :', error);
    throw error;
  }
};

export const getKHPGGById = async (id, page, size) => {
  try {
    const result = await get(`coupons/customer-coupons/${id}?page=${page - 1}&size=${size}`);
    console.log('GET response:', result);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error get :', error);
    throw error;
  }
};

export const deleteKhPGG = async (id, status) => {
  try {
    const result = await del2(`coupons/customer-coupons/del/${id}?status=${status}`);
    console.log('GET response:', result);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error get :', error);
    throw error;
  }
};

export const stopKhPGG = async (id) => {
  try {
    const result = await put(`coupons/updateStatusPause/${id}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error put :', error);
    throw error;
  }
};

export const startKhPGG = async (id) => {
  try {
    const result = await put(`coupons/updateStatusStart/${id}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error put :', error);
    throw error;
  }
};

export const getAllCouponsToBill = async (billCode) => {
  try {
    const result = await get(`coupons/to-bill/${billCode}`);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error get :', error);
    throw error;
  }
};

export const checkStatusForBill = async () => {
  try {
    const result = await put(`/coupons/checkupdatestatus`);
    debugger;
    return result;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }
    console.log('Error check status :', error);
    throw error;
  }
};
