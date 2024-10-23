import { Alert, Badge, Chip, Drawer, Fab, Grid, IconButton, Snackbar, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import { IconShoppingBagDiscount } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { gridSpacing } from 'store/constant';
import { ArrowBack, Refresh } from '@mui/icons-material';
import { changeStatusByCode, listHangBill } from 'services/admin/bill/billService';

function HangBill(props) {
  const { onReload, bills } = props;
  // drawer on/off
  const [open, setOpen] = useState(false);
  const [hangBills, setHangBills] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchAll();
  }, [bills]);

  const fetchAll = async () => {
    try {
      const response = await listHangBill();
      if (response.status_code === 200) {
        setHangBills(response.data);
        setQuantity(response.data.length);
      }
    } catch (error) {
      console.log('Lỗi', error);
    }
  };

  //   const handleClick = (code) => {
  //     updateStatusByCode(code);
  //   };

  const handleClick = async (code) => {
    if (bills.length >= 5) {
      setSnackbarMessage('Đã đủ 5 hóa đơn không thể chuyển lại được');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      return;
    }
    try {
      const response = await changeStatusByCode(code, 'DON_MOI');
      if (response.status_code === 201) {
        setSnackbarMessage('Hủy treo hóa đơn thành công');
        setSnackbarSeverity('success');
        fetchAll();
        onReload();
      }
    } catch (error) {
      setSnackbarMessage('Chuyển đổi trạng thái thất bại');
      setSnackbarSeverity('error');
      console.log('Lỗi', error);
    }
    setSnackbarOpen(true);
  };
  return (
    <>
      <Tooltip title="Hóa đơn treo" placement="top">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '12%',
            position: 'fixed',
            right: 10
          }}
        >
          <Badge badgeContent={quantity} color="error" overlap="circular">
            <IconButton color="inherit" size="large" disableRipple>
              <IconShoppingBagDiscount />
            </IconButton>
          </Badge>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280
          }
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <SubCard title="Danh sách hóa đơn treo">
                <Table>
                  <TableBody>
                    {hangBills.map((invoice) => (
                      <TableRow key={invoice}>
                        <TableCell align="center" sx={{ width: '10%' }}>
                          <Tooltip title="Chuyển về bán hàng" placement="top">
                            <IconButton
                              onClick={() => {
                                handleClick(invoice);
                              }}
                            >
                              <Refresh />
                              {/* <ArrowBack /> */}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="left" sx={{ width: '90%' }}>
                          <Chip label={invoice} color="warning" sx={{ fontWeight: 'bold', width: '100%' }} />
                          {/* {invoice.code} */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </SubCard>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default HangBill;
