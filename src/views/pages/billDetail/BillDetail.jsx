import { Alert, Fab, IconButton, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getBillByCode, getBillHistoryByBillId } from 'services/admin/bill/billService';
import NewTimeLine from './TimeLine';
import BillInFo from './BillInFo';
import SerialNumberSold from './SerialNumberSold';
import HistoryPayment from './HistoryPayment';
import Test2 from '../ban-hang/Test2';
import OrderInfo from './OrderInfo';
import OrderStep from './OrderStep';

function BillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleNavigate = () => {
    navigate('/hoa-don/danh-sach');
  };
  console.log('BILL DETAIL => ID : ', id);
  console.log('BILL DETAIL => BILL : ', bill);
  console.log('BILL DETAIL => HISTORY : ', billHistory);

  return (
    <div style={{ backgroundColor: 'while' }}>
      <Fab
        color="secondary"
        aria-label="back"
        sx={{
          position: 'fixed',
          top: 170,
          right: 15
        }}
        onClick={handleNavigate}
      >
        <ArrowBackIcon />
      </Fab>
      <NewTimeLine data={billHistory} onLoading={onLoading} bill={bill} />
      <BillInFo bill={bill} onLoading={onLoading} />
      <HistoryPayment bill={bill} />
      <SerialNumberSold onLoading={onLoading} bill={bill} title="Hóa đơn chi tiết" />
      <OrderInfo onLoading={onLoading} bill={bill} onReload={onLoading} />
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
    </div>
  );
}
export default BillDetail;
