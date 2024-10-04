import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBillByCode, getBillHistoryByBillId } from 'services/admin/bill/billService';
import NewTimeLine from './TimeLine';
import BillInFo from './BillInFo';

function BillDetail() {
  const { id } = useParams();

  // hóa đơn
  const [bill, setBill] = useState({});

  // lịch sử hóa đơn
  const [billHistory, setBillHistory] = useState([]);

  // thông báo
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // hộp thông báo
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchBill();
    fetchBillHistory();
  }, [id]);

  // chi tiết hóa đơn
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

  const fetchBillHistory = async () => {
    const response = await getBillHistoryByBillId(id);
    if (response.status_code === 200) {
      setBillHistory(response.data);
    }
  };

  const onLoading = () => {
    fetchBill();
    fetchBillHistory();
  };

  // lịch sử

  console.log('ID : ', id);
  console.log('Hoa đơn : ', bill);
  console.log('Lịch sử : ', billHistory);

  return (
    <>
      <NewTimeLine data={billHistory} onLoading={onLoading} bill={bill} />
      <BillInFo bill={bill} onLoading={onLoading} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
export default BillDetail;
