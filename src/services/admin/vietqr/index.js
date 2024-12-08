import axios from 'axios';

export const getQr = async (amount, billCode) => {
  try {
    const payload = {
      accountNo: '26076868689999',
      accountName: 'NGUYEN TIEN MANH',
      acqId: 970422,
      amount: amount,
      addInfo: 'Thanh toán đơn hàng' + billCode,
      format: 'text',
      template: 'compact'
    };

    const response = await axios.post('https://api.vietqr.io/v2/generate', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error.response?.data || error.message);
    throw error;
  }
};
