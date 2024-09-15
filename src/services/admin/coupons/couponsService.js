import { get, post, patch, put, del, del2 } from 'utils/request';

export const filterCoupons = async (page, size, path) => {
  try {
    console.log('PATH : ', path);
    const result = await get(`coupons/all?page=${page - 1}&size=${size}&sort=id,DESC&filter=${path}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching coupons filter:', error);
    throw error;
  }
};

export const getPGGPage = async (page, size) => {
  try {
    const result = await get(`coupons?page=${page - 1}&size=${size}`);
    return result;
  } catch (error) {
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
    console.log('Error get :');
    throw error;
  }
};

export const createPGG = async (options) => {
  try {
    const result = await post('coupons/add', options);
    return result;
  } catch (error) {
    console.error('Error creating coupons:', error);
    throw error;
  }
};

export const deletedCoupons = async (id) => {
  try {
    debugger;
    const result = await del(`coupons/delete/${id}`);
    return result;
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};

export const updatedPGG = async (id, pgg) => {
  try {
    const result = await put(`coupons/update/${id}`, pgg);
    return result;
  } catch (error) {
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
    console.log('Error get :', error);
    throw error;
  }
};
