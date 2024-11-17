import React, { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Snackbar,
  Alert,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useParams } from 'react-router-dom';
import { changeStatusByCode, createBill, getBillByCode } from 'services/admin/bill/billService';
import { deleteBillByCode, getBillCodes } from 'services/admin/sell/sellService';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification';

import SellManager from './SellManager';
import HangBill from './HangBill';

function Sell() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState({});
  const [tabs, setTabs] = useState([]);
  const [value, setValue] = useState(null);
  const [showModalProducts, setShowModalProducts] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClickOpen = (code) => {
    setOpenDialog(true);
    setSelectedCode(code);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchBillCodes = async () => {
    const response = await getBillCodes();
    if (response.status_code === 200) {
      if (response.data.length > 0) {
        setTabs(response.data);
        setValue(0);
        navigate(`/ban-hang/hoa-don/${response.data[0]}`);
      } else {
        setTabs([]); // Nếu không còn hóa đơn nào thì set về mảng rỗng
        setValue(null);
        navigate('/ban-hang');
      }
    }
  };
  useEffect(() => {
    fetchBillCodes();
    // navigate('/ban-hang');
  }, []);

  const fetchBill = async (billCode) => {
    try {
      const response = await getBillByCode(billCode);
      if (response.status_code === 200) {
        setBill(response.data);
        console.log('CAlll APi');
      }
    } catch (error) {
      setBill({});
      navigate('/ban-hang');
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/ban-hang/hoa-don/${tabs[newValue]}`);
    console.log('Code : ', tabs[newValue]);
    if (tabs[newValue]) {
      fetchBill(tabs[newValue]);
    }
  };

  const handleShowModalProducts = () => {
    setShowModalProducts(!showModalProducts);
  };

  const handleCancelModalProducts = () => {
    setShowModalProducts(false);
  };

  const handleCreateBill = async () => {
    if (tabs.length >= 5) {
      setSnackbarMessage('Chỉ được phép tạo 5 hóa đơn . Bạn hãy treo 1 hóa đơn để tạo mới');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate('/ban-hang');
      return;
    }
    const response = await createBill();
    if (response.status_code === 201) {
      setTabs((prevTabs) => [response.data.ma, ...prevTabs]);
      setValue(0);
      navigate(`/ban-hang/hoa-don/${response.data.ma}`);
      toast.success(NotificationStatus.CREATED);
    }
  };

  const handleReload = () => {
    fetchBillCodes();
    // setValue(null);
    navigate('/ban-hang');
  };

  const handleConfirm = async () => {
    try {
      const response = await changeStatusByCode(selectedCode, 'TREO'); // Sử dụng selectedCode
      if (response.status_code === 201) {
        setSnackbarMessage('Hủy treo hóa đơn thành công');
        setSnackbarSeverity('success');
        fetchBillCodes(); // Cập nhật danh sách hóa đơn
      }
    } catch (error) {
      setSnackbarMessage('Chuyển đổi trạng thái thất bại');
      setSnackbarSeverity('error');
      console.log('Lỗi', error);
    } finally {
      setSnackbarOpen(true); // Mở snackbar để thông báo
      handleCloseDialog(); // Đóng dialog sau khi xác nhận
    }
  };
  return (
    <>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {tab}
                    <Tooltip title="Treo hóa đơn này" placement="top">
                      <IconButton
                        onClick={() => {
                          handleClickOpen(tab);
                        }}
                      >
                        <ShoppingCartIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {/* <IconButton onClick={() => handleDelete(tab)} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton> */}
                  </Box>
                }
              />
            ))}
            <Tab
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    padding: '10px',
                    height: '30px',
                    width: '30px',
                    border: '2px solid #697586'
                  }}
                >
                  <AddIcon onClick={() => handleCreateBill()} sx={{ fontSize: 30 }} />
                </Box>
              }
            />
          </Tabs>
        </Box>{' '}
        <SellManager exitingBill={bill} onReload={handleReload} />
        {/* <Cart bill={bill} onReload={handleReload} /> */}
      </Box>
      <HangBill onReload={handleReload} bills={tabs} />
      {/*  */}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn thực hiện hành động này?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      {/*  */}
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

export default Sell;
