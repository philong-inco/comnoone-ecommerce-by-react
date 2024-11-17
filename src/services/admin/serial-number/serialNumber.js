import { get, post, patch, put, del, del2 } from 'utils/request';

export const getAllSerialNumberByProductId = async (productId, page, size) => {
  try {
    const result = await get(`serial-number/product-detail/${productId}?status=0&page=${page}&size=${size}`);
    return result;
  } catch (error) {
    console.error('Error fetching serial number by product id :', error);
    throw error;
  }
};

export const getAllSerialNumberByProductId2 = async (productId, page, size) => {
  try {
    const result = await get(`serial-number/product-detail-/${productId}?page=${page}&size=${size}`);
    return result;
  } catch (error) {
    console.error('Error fetching serial number by product id :', error);
    throw error;
  }
};

export const findSerialNumberByProductIdAndCodeSerial = async (productId, codeSerial, page, size) => {
  try {
    const result = await get(`serial-number/product-detail-code-serial/${productId}?size=${size}&page=${page}&codeSerial=${codeSerial}`);
    return result;
  } catch (error) {
    console.error('Error fetching serial number by product id :', error);
    throw error;
  }
};

export const findSerialNumberByProductIdAndCodeSerialAndBillCode = async (billCode, productId, codeSerial, page, size) => {
  try {
    const result = await get(
      `serial-number/product-detail-code-serial-in-bill/${productId}?size=${size}&page=${page}&codeSerial=${codeSerial}&codeBill=${billCode}`
    );
    return result;
  } catch (error) {
    console.error('Error fetching serial number by product id :', error);
    throw error;
  }
};

export const findSerialNumberByProductCodeAndCodeSerialAndBillCode = async (billCode, productCode, codeSerial, page, size) => {
  try {
    const result = await get(
      `serial-number/product-detail-code-serial-in-bill-tow/${productCode}?size=${size}&page=${page}&codeSerial=${codeSerial}&codeBill=${billCode}`
    );
    return result;
  } catch (error) {
    console.error('Error fetching serial number by product id :', error);
    throw error;
  }
};
