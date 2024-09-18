import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBillByCode, getBillHistoryByBillId } from 'services/admin/bill/billService';
import TimeLine from './TimeLine';
import { Button, Chip, Grid, Typography } from '@mui/material';
import { getStatusColor, getStatusDisplayName } from 'utils/billUtil/billStatus';
import { Box } from '@mui/system';
import PaymentHistory from './PaymentHistory';
import BillHistory from './BillHistory';
import ProductInBill from './ProductInBill';
import AddressDialog from './AddressDialog ';

function BillDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [billHistory, setBillHistory] = useState([]);
  const [bill, setBill] = useState({});

  const fetchBillHistory = async () => {
    const response = await getBillHistoryByBillId(id);
    if (response.status_code === 200) {
      setBillHistory(response.data);
    }
  };

  const fetchBill = async () => {
    const response = await getBillByCode(id);
    if (response.status_code === 200) {
      setBill(response.data);
    }
  };
  useEffect(() => {
    fetchBillHistory();
    fetchBill();
  }, [id, loading]);

  const handleLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Quản lý đơn hàng :{' '}
        <Typography component="span" sx={{ color: 'gray' }}>
          {bill.ma}
        </Typography>
      </Typography>
      <TimeLine billHistory={billHistory} handleLoading={handleLoading} />
      <BillHistory billHistory={billHistory} bill={bill} handleLoading={handleLoading} />

      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', borderRadius: 4, mt: 1 }}>
        <Grid item xs={10}>
          <Typography variant="h5">Thông tin đơn hàng</Typography>
        </Grid>
        <Grid item xs={2} container justifyContent="flex-end">
          <AddressDialog />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Mã:</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', ml: 1 }}>
            {bill.ma}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Tên khách hàng:</Typography>
            {bill.tenKhachHang === null ? (
              <Chip label="Khách lẻ" color="info" sx={{ ml: 1 }} />
            ) : (
              <Typography variant="body1" sx={{ ml: 1 }}>
                {bill.tenKhachHang}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Trạng thái:</Typography>
            <Chip
              label={getStatusDisplayName(bill.trangThai)}
              sx={{ ml: 1, backgroundColor: getStatusColor(bill.trangThai), color: '#fff' }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">SĐT người nhận:</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {bill.sdt}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Loại hóa đơn:</Typography>
            <Chip
              label={bill.loaiHoaDon == '0' ? 'Tại quầy' : 'Online'}
              color={bill.loaiHoaDon == '0' ? 'primary' : 'success'}
              sx={{ ml: 1 }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Tên người nhận:</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {' ???'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <PaymentHistory billHistory={billHistory} />
      <ProductInBill handleLoading={handleLoading} bill={bill} fetchBill={fetchBill} />
    </>
  );
}

export default BillDetail;
