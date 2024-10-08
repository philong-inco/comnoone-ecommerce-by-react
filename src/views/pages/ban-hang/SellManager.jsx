import { useNavigate, useParams } from 'react-router-dom';
import SerialNumberSold from '../billDetail/SerialNumberSold';
import { getBillByCode } from 'services/admin/bill/billService';
import { useEffect, useState } from 'react';
import CustomerInBill from './dialog-san-pham/CustomerInBill';
import Test from './Test';

function SellManager(props) {
  const { onReload } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  // hóa đơn
  const [bill, setBill] = useState({});
  const fetchBill = async () => {
    try {
      const response = await getBillByCode(id);
      if (response.status_code === 200) {
        setBill(response.data);
      }
    } catch (error) {
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchBill();
  }, [id]);

  const onLoading = () => {
    fetchBill();
  };

  const loadBillInTab = () => {
    setBill({});
    onReload();
    console.log('Gọi hàm nay');
  };
  const loadAll = () => {
    onReload(); // gọi hàm onReload
  };
  return (
    <>
      <SerialNumberSold onLoading={onLoading} bill={bill} />
      <CustomerInBill onLoading={onLoading} bill={bill} />
      <Test onLoading={onLoading} billInfo={bill} onReload={loadBillInTab} />
    </>
  );
}

export default SellManager;
