import axios from 'axios';

export const fetchAllProvince = async () => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: {
        token: '0292ba75-34b6-11ef-89ca-1aad91406dac'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const fetchAllProvinceDistricts = async (codeProvince) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
      headers: {
        token: '0292ba75-34b6-11ef-89ca-1aad91406dac'
      },
      params: {
        province_id: codeProvince
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const fetchAllProvinceWard = async (codeDistrict) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
      headers: {
        token: '0292ba75-34b6-11ef-89ca-1aad91406dac'
      },
      params: {
        district_id: codeDistrict
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wards:', error);
    throw error;
  }
};

export const fetchAllMoneyShip = async (to_district_id, to_ward_code, quantity) => {
  let quantityProducts = quantity ? quantity : 1;

  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
      headers: {
        token: '0292ba75-34b6-11ef-89ca-1aad91406dac',
        shop_id: '4310459'
      },
      params: {
        service_type_id: 2,
        insurance_value: '',
        coupon: '',
        from_district_id: 1485,
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        height: 11 * quantityProducts,
        length: 28,
        weight: 300 * quantityProducts,
        width: 16
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shipping fee:', error);
    throw error;
  }
};

export const fetchAllDayShip = async (to_district_id, to_ward_code) => {
  try {
    const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime', {
      headers: {
        token: '0292ba75-34b6-11ef-89ca-1aad91406dac',
        shop_id: '4374133'
      },
      params: {
        from_district_id: 1485,
        from_ward_code: '1A0607',
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        service_id: 53320
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shipping lead time:', error);
    throw error;
  }
};
