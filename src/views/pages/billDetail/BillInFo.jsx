import { Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getStatusColor, getStatusDisplayName } from 'utils/billUtil/billStatus';
import AddressDiaLog from './AddressDiaLog';

function BillInFo(props) {
  const { bill, onLoading } = props;
  const shouldShowAddressDialog = !(
    bill.trangThai === 'DANG_GIAO' ||
    bill.trangThai === 'HOAN_THANH' ||
    bill.trangThai === 'CHO_GIAO' ||
    bill.trangThai === 'HUY'
  );
  return (
    <>
      <Grid container spacing={2} padding={3} sx={{ backgroundColor: 'white', borderRadius: 4, mt: 2, boxShadow: 3 }}>
        <Grid item xs={10}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Thông tin đơn hàng
          </Typography>
        </Grid>
        <Grid item xs={2} container justifyContent="flex-end">
          {shouldShowAddressDialog && (
            <AddressDiaLog
              onLoading={() => {
                onLoading();
              }}
            />
          )}
        </Grid>

        {/* Mã đơn hàng */}
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Mã:
            </Typography>
            <Typography variant="body1" sx={{ ml: 1, color: '#007bff', fontWeight: 'bold' }}>
              {bill.ma}
            </Typography>
          </Box>
        </Grid>

        {/* Tên khách hàng */}
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Tên khách hàng:
            </Typography>
            {bill.idKhachHang == null ? (
              <Chip label="Khách lẻ" color="info" sx={{ ml: 1 }} />
            ) : (
              <Typography variant="body1" sx={{ ml: 1 }}>
                {bill.tenKhachHang || bill.idKhachHang}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Trạng thái đơn hàng */}
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Trạng thái:
            </Typography>
            <Chip
              label={getStatusDisplayName(bill.trangThai)}
              sx={{ ml: 1, backgroundColor: getStatusColor(bill.trangThai), color: '#fff' }}
            />
          </Box>
        </Grid>

        {/* SĐT người nhận */}
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              SĐT người nhận:
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {bill.sdt}
            </Typography>
          </Box>
        </Grid>

        {/* Loại hóa đơn */}
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Loại hóa đơn:
            </Typography>
            <Chip
              label={bill.loaiHoaDon == '0' ? 'Tại quầy' : 'SHIP'}
              color={bill.loaiHoaDon == '0' ? 'primary' : 'success'}
              sx={{ ml: 1 }}
            />
          </Box>
        </Grid>

        {/* Tên người nhận */}
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Địa chỉ
            </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {bill.diaChi}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default BillInFo;
