import { get, post, patch, put, del } from 'utils/request';

// export const getPGG = async () => {
//   try {
//     const result = await get('v1/coupons')
//     return result
//   } catch (error) {
//     console.error('Error fetching product list:', error)
//     throw error
//   }
// }
export const getPGGPage = async (page, size) => {
  try {
    const result = await get(`v1/coupons?page=${page - 1}&size=${size}`);
    // console.log('GET response:', result)
    return result;
  } catch (error) {
    console.log('Error get :');
    throw error;
  }
};

export const getPGGById = async (id) => {
  try {
    const result = await get(`v1/coupons/detail/${id}`);
    console.log('GET response:', result);
    return result;
  } catch (error) {
    console.log('Error get :');
    throw error;
  }
};

export const createPGG = async (options) => {
  try {
    const result = await post('v1/coupons/add', options);
    return result;
  } catch (error) {
    console.error('Error creating book room:', error);
    throw error;
  }
};

export const deletedCoupons = async (id) => {
  try {
    const result = await del(`v1/coupons/delete/${id}`);
    return result;
  } catch (error) {
    console.error('Error :');
    throw error;
  }
};

export const updatedPGG = async (id, pgg) => {
  try {
    const result = await put(`v1/coupons/update/${id}`, pgg);
    return result;
  } catch (error) {
    console.error('Error :');
    throw error;
  }
};

// api 2

export const getKHPGGById = async (id, page, size) => {
  try {
    const result = await get(`v1/coupons/customer-coupons/${id}?page=${page - 1}&size=${size}`);
    console.log('GET response:', result);
    return result;
  } catch (error) {
    console.log('Error get :');
    throw error;
  }
};

// huy phiếu của kh

export const deleteKhPGG = async (id, status) => {
  try {
    const result = await del(`v1/coupons/customer-coupons/del/${id}?status=${status}`);
    console.log('GET response:', result);
    return result;
  } catch (error) {
    console.log('Error get :');
    throw error;
  }
};
