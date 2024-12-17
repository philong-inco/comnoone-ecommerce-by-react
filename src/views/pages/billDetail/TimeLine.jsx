import {
  Alert,
  Button,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  CircularProgress
} from '@mui/material';
import { IconArticleFilledFilled } from '@tabler/icons-react';

import { useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AiFillCarryOut, AiFillFile } from 'react-icons/ai';
import { changeStatusByCode, getPDF, updateStatusByCode } from 'services/admin/bill/billService';

import { getStatusBillHistory, getStatusBillHistoryColor } from 'utils/billUtil/billStatus';
import OrderStep from './OrderStep';
// import { Timeline } from '@mui/icons-material';

function NewTimeLine(props) {
  const { id } = useParams();
  const { data, onLoading, bill } = props;
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const iframeRef = useRef();

  const maxHeight = window.innerHeight * 0.5;

  const showIcon = (statusBill) => {
    if (statusBill === 0) {
      // return <AiFillFile />;
      return <IconArticleFilledFilled style={{ color: '#3f51b5', width: '100%', transform: 'scale(2)' }} />;
    } else if (statusBill === 1) {
      return <IconArticleFilledFilled style={{ color: '#f44336', width: '100%', transform: 'scale(2)' }} />; // Đỏ
    } else if (statusBill === 'VAN_CHUYEN') {
      return <IconArticleFilledFilled style={{ color: '#ff9800', width: '100%', transform: 'scale(2)' }} />; // Cam
    } else if (statusBill === 'CHO_VAN_CHUYEN') {
      return <IconArticleFilledFilled style={{ color: '#2196f3', width: '100%', transform: 'scale(2)' }} />; // Xanh dương
    } else if (statusBill === 'DA_THANH_TOAN') {
      return <IconArticleFilledFilled style={{ color: '#4caf50', width: '100%', transform: 'scale(2)' }} />; // Xanh lá
    } else if (statusBill === 'THANH_CONG') {
      return <IconArticleFilledFilled style={{ color: '#8bc34a', width: '100%', transform: 'scale(2)' }} />; // Xanh lá nhạt
    } else if (statusBill === 8) {
      return <IconArticleFilledFilled style={{ color: '#f44336', width: '100%', transform: 'scale(2)' }} />; // Đỏ
    } else {
      return <IconArticleFilledFilled style={{ color: '#9e9e9e', width: '100%', transform: 'scale(2)' }} />; // Màu xám cho trạng thái khác
    }
  };

  const showLabel = (newStatusBill) => {
    let label = 'Trạng thái chưa được định nghĩa';
    let color = 'default'; // Màu mặc định

    switch (newStatusBill) {
      case 'DON_MOI':
        label = 'ĐƠN MỚI';
        color = 'primary';
        break;
      case 'HUY':
        label = 'HỦY';
        color = 'error'; // Màu đỏ
        break;
      case 'CHO_GIAO':
        label = 'CHỜ VẬN CHUYỂN';
        color = 'warning'; // Màu vàng
        break;
      case 'DANG_GIAO':
        label = 'ĐÃ VẬN CHUYỂN';
        color = 'info'; // Màu xanh dương
        break;
      case 'TRA_HANG_HOAN_TIEN':
        label = 'TRẢ HÀNG HOÀN TIỀN';
        color = 'success'; // Màu xanh lá
        break;
      case 'HOAN_THANH':
        label = 'HOÀN THÀNH';
        color = 'success'; // Màu xanh lá
        break;
      case 'XAC_NHAN':
        label = 'ĐÃ XÁC NHẬN';
        color = 'primary'; // Màu chính
        break;
      case 'CHO_XAC_NHAN':
        label = 'CHỜ XÁC NHẬN';
        color = 'warning'; // Màu chính
        break;
      default:
        break;
    }

    return <Chip label={label} color={color} />;
  };
  const columns = [
    { id: 'stt', label: 'STT' },
    { id: 'ngayTao', label: 'Thời gian', minWidth: 100, maxWidth: 250 },
    { id: 'nguoiTao', label: 'Người thực hiện', minWidth: 100, maxWidth: 150 },
    { id: 'ghiChuChoCuaHang', label: 'Ghi chú của hàng', minWidth: 150, maxWidth: 200 },
    { id: 'ghiChuChoKhachHang', label: 'Ghi chú khách hàng', minWidth: 150, maxWidth: 200 },
    { id: 'trangThai', label: 'Trạng Thái', minWidth: 120, maxWidth: 150 }
  ];

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [errorMessages, setErrorMessages] = useState({});

  // ghi chú

  const [formData, setFormData] = useState({
    ghiChuCuaHang: '',
    ghiChuKhachHang: ''
  });

  // dialog lịch sử hóa đơn

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenNoMessage, setIsDialogOpenNoMessage] = useState(false);

  // dialog xác nhận
  const [openDialogConfirm, setDialogConfirm] = useState(false);
  const [keyStatus, setKeyStatus] = useState('');
  const [openConfirmOk, setOpenConfirmOk] = useState(false);

  // hộp thông báo
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  // api
  const apiUpdateStatusBill = async (data) => {
    setLoading(true);

    try {
      const response = await updateStatusByCode(id, keyStatus, data);
      if (response.status_code == 201) {
        setSnackbarMessage('Cập nhập trạng thái hóa đơn ' + id + ' thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setErrorMessages({});
        setKeyStatus('');
        setDialogConfirm(false);
        setFormData({ ghiChuCuaHang: '', ghiChuKhachHang: '' });
        onLoading();
      }
    } catch (error) {
      // if (error.response && error.response.data) {
      //   const messages = error.response.data.message;
      //   const minError = messages.reduce((prev, curr) => {
      //     return prev.error_code < curr.error_code ? prev : curr;
      //   });
      //   setErrorMessages({
      //     [minError.field]: minError.messages
      //   });
      // }
      const messages = error.response.data.message;
      console.log(messages);

      if (Array.isArray(messages)) {
        // Nếu là mảng
        if (messages.length > 0) {
          const minError = messages.reduce((prev, curr) => {
            return prev.error_code < curr.error_code ? prev : curr;
          });
          setErrorMessages({
            [minError.field]: minError.messages
          });
          console.log('Error nhỏ nhất:', minError);
        } else {
          console.log('Messages là mảng rỗng');
        }
      } else {
        setSnackbarMessage(error.response.data.error);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.log('Messages không hợp lệ');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatusByCodeNoMessage = async () => {
    try {
      const response = await changeStatusByCode(id, keyStatus);
      if (response.status_code == 201) {
        setSnackbarMessage('Cập nhập trạng thái hóa đơn ' + id + ' thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setIsDialogOpenNoMessage(false);
        setErrorMessages({});
        setKeyStatus('');
        onLoading();
      }
    } catch (error) {
      console.log(error);
      // setSnackbarMessage(error.response.data.message);
      setSnackbarMessage(error.response.data.error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.log(error);
    }
  };

  // form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Hàm xử lý khi gửi form
  const handleSave = (event) => {
    // const data = {
    //   hiChuCuaHang: formData.ghiChuCuaHang.trim(),
    // ghiChuKhachHang: formData.ghiChuKhachHang.trim()
    // };
    apiUpdateStatusBill(formData);
  };
  // no
  const handleSaveNoMessage = (event) => {
    // const data = {
    //   hiChuCuaHang: formData.ghiChuCuaHang.trim(),
    // ghiChuKhachHang: formData.ghiChuKhachHang.trim()
    // };
    updateStatusByCodeNoMessage();
  };

  // dialog lịch sử
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  // NoMessage
  const handleOpenDialogNoMessage = () => {
    setIsDialogOpenNoMessage(true);
  };

  const handleCloseDialogNoMessage = () => {
    setIsDialogOpenNoMessage(false);
  };

  const handleOpenDialogConfirm = () => {
    setDialogConfirm(true);
  };

  const handleClickBtnStatus = (key) => {
    setKeyStatus(key);
    handleOpenDialogConfirm();
    // handleSave(key);
  };

  const handleClickBtnStatusNoMessage = (key) => {
    setKeyStatus(key);
    handleOpenDialogNoMessage();
  };

  const handleCloneForm = () => {
    setDialogConfirm(false);
    setErrorMessages({});
    setKeyStatus('');
    setFormData({ ghiChuCuaHang: '', ghiChuKhachHang: '' });
  };

  const handleCloseOkeDialog = () => {
    setOpenConfirmOk(false);
    handleCloneForm();
  };

  const openConfirmOkeDialog = () => {
    setOpenConfirmOk(true);
  };

  const renderButtons = (bill) => {
    const buttons = [];

    // Nút Hủy
    if (
      bill.trangThai === 'CHO_THANH_TOAN' ||
      bill.trangThai === 'CHO_XAC_NHAN' ||
      bill.trangThai === 'CHO_GIAO' ||
      // bill.trangThai === 'DANG_GIAO' ||
      bill.trangThai === 'XAC_NHAN' ||
      bill.trangThai === 'DON_MOI' ||
      bill.trangThai === 'TREO' ||
      bill.trangThai === 'HEN_LAI'
    ) {
      buttons.push(
        <Grid item xs={3} key="huy-button">
          <Button variant="contained" color="error" onClick={() => handleClickBtnStatus('HUY')} fullWidth>
            HỦY
          </Button>
        </Grid>
      );
    }

    // Nút Chờ Giao
    if ((bill.trangThai === 'DON_MOI' || bill.trangThai === 'CHO_XAC_NHAN' || bill.trangThai === 'TREO') && bill.loaiHoaDon === 1) {
      buttons.push(
        <Grid item xs={3} key="xac-nhan-button">
          <Button variant="contained" onClick={() => handleClickBtnStatusNoMessage('XAC_NHAN')} fullWidth>
            XÁC NHẬN
          </Button>
        </Grid>
      );
    } else if (bill.trangThai === 'TREO' && bill.loaiHoaDon === 1) {
      buttons.push(
        <Grid item xs={3} key="xac-nhan-button">
          <Button variant="contained" onClick={() => handleClickBtnStatusNoMessage('XAC_NHAN')} fullWidth>
            XÁC NHẬN
          </Button>
        </Grid>
      );
    } else if (bill.trangThai === 'TREO' && bill.loaiHoaDon === 0) {
      buttons.push(
        <Grid item xs={3} key="hoan-thanh-button">
          <Button variant="contained" onClick={() => handleClickBtnStatusNoMessage('HOAN_THANH')} fullWidth>
            Hoàn thành
          </Button>
        </Grid>
      );
    } else if (bill.trangThai === 'DON_MOI' && bill.loaiHoaDon === 0) {
      buttons.push(
        <Grid item xs={3} key="hoan-thanh-button">
          <Button variant="contained" onClick={() => handleClickBtnStatus('HOAN_THANH')} fullWidth>
            HOÀN THÀNH
          </Button>
        </Grid>
      );
    } else if (bill.trangThai === 'XAC_NHAN' && bill.loaiHoaDon === 1) {
      buttons.push(
        <Grid item xs={3} key="hoan-thanh-button">
          <Button variant="contained" onClick={() => handleClickBtnStatusNoMessage('CHO_GIAO')} fullWidth>
            CHỜ VẬN CHUYỂN
          </Button>
        </Grid>
      );
    } else if (bill.trangThai === 'DANG_GIAO' && bill.loaiHoaDon === 1) {
      buttons.push(
        <>
          <Grid item xs={3} key="hoan-thanh-button">
            <Button variant="contained" style={{ background: 'yellow' }} onClick={() => handleClickBtnStatusNoMessage('HEN_LAI')} fullWidth>
              HẸN LẠI{' '}
            </Button>
          </Grid>
          <Grid item xs={3} key="hoan-thanh-button">
            <Button variant="contained" onClick={() => handleClickBtnStatusNoMessage('HOAN_THANH')} fullWidth>
              HOÀN THÀNH
            </Button>
          </Grid>
        </>
      );
    } else if (bill.trangThai === 'HEN_LAI') {
      buttons.push(
        <>
          <Grid item xs={3} key="hoan-thanh-button">
            <Button variant="contained" onClick={() => handleClickBtnStatusNoMessage('HOAN_THANH')} fullWidth>
              HOÀN THÀNH
            </Button>
          </Grid>
        </>
      );
    }

    // Nút Đang Giao
    if (bill.trangThai === 'CHO_GIAO' && bill.loaiHoaDon === 1) {
      buttons.push(
        <Grid item xs={3} key="dang-giao-button">
          <Button variant="contained" onClick={() => handleClickBtnStatus('DANG_GIAO')} fullWidth>
            ĐÃ VẬN CHUYỂN
          </Button>
        </Grid>
      );
    }

    // Nút Trả Hàng Hoàn Tiền
    // if (bill.trangThai === 'HOAN_THANH') {
    //   buttons.push(
    //     <Grid item xs={3} key="tra-hang-hoan-tien-button">
    //       <Button variant="contained" onClick={() => handleClickBtnStatus('TRA_HANG_HOAN_TIEN')} fullWidth>
    //         TRẢ HÀNG HOÀN TIỀN
    //       </Button>
    //     </Grid>
    //   );
    // }

    return (
      <Grid container spacing={2}>
        {buttons}
      </Grid>
    );
  };

  console.log('BILL IN TIME LINE : ', bill);
  const fetchInvoicePdf = async () => {
    try {
      const response = await fetch(`https://weblaptop-by-springboot-and-reactjs-aqjc.onrender.com/api/bills/order-pdf/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf'
        }
      });

      if (response.ok) {
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
        setSnackbarMessage('Xuất hóa đơn thành công');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Gọi in PDF từ iframe sau khi đã tải
        setTimeout(() => {
          iframeRef.current.contentWindow.print(); // In file PDF trong iframe
        }, 500);
      } else {
        console.error('Failed to fetch PDF');
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };
  return (
    <>
      <div>
        <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', borderRadius: 4, mt: 1, boxShadow: 3 }}>
          {/* <Grid item xs={12}>
            <Typography variant="h2">Lịch sử đơn hàng</Typography>
          </Grid> */}

          {/* Bọc các phần tử với div có overflow
          <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '10px', justifyContent: 'center' }}>
            {data.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item.id}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 2, minWidth: '300px' }}
              >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'center',
                    height: 'auto',
                    maxWidth: '250px'
                  }}
                >
                  <CardContent sx={{ padding: 3, textAlign: 'center' }}>
                    {showIcon(item.trangThai)}{' '}
                    <Typography variant="h4" sx={{ mt: 2, textAlign: 'center' }}>
                      {getStatusBillHistory(item.trangThai)}
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 1, fontSize: '0.875rem', textAlign: 'center' }}>
                      {item.ngayTao}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </div> */}
          <OrderStep data={data} />
          <Grid item xs={12} sx={{ marginTop: 0 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                {renderButtons(bill)}
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Lịch sử hóa đơn" arrow placement="top">
                  <Button variant="contained" color="secondary" fullWidth onClick={fetchInvoicePdf}>
                    In Hóa Đơn
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Lịch sử hóa đơn" arrow placement="top">
                  <Button variant="contained" color="secondary" fullWidth onClick={handleOpenDialog}>
                    Chi tiết
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {/* Dia log lịch sử thao tác */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            Chi tiết lịch sử thay đổi hóa đơn : <strong>{id}</strong>
          </Typography>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} style={{ maxHeight: maxHeight, overflowY: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell style={{ minWidth: columns[0].minWidth, maxWidth: columns[0].maxWidth }}>{row.ngayTao}</TableCell>
                    <TableCell style={{ minWidth: columns[1].minWidth, maxWidth: columns[1].maxWidth }}>{row.nguoiTao}</TableCell>

                    <TableCell
                      style={{
                        minWidth: columns[3].minWidth,
                        maxWidth: columns[3].maxWidth,
                        wordWrap: 'break-word', // Cho phép xuống dòng
                        whiteSpace: 'normal'
                      }}
                    >
                      {row.ghiChuChoCuaHang}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: columns[4].minWidth,
                        maxWidth: columns[4].maxWidth,
                        wordWrap: 'break-word', // Cho phép xuống dòng
                        whiteSpace: 'normal'
                      }}
                    >
                      {row.ghiChuChoKhachHang}
                    </TableCell>
                    <TableCell style={{ minWidth: columns[2].minWidth, maxWidth: columns[2].maxWidth }}>
                      <Chip
                        label={getStatusBillHistory(row.trangThai)}
                        sx={{
                          backgroundColor: getStatusBillHistoryColor(row.trangThai),
                          color: '#fff',
                          width: '120px',
                          borderRadius: '20px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận */}

      <Dialog
        open={openDialogConfirm}
        onClose={handleCloneForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title5">Xác nhận hành động</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Chuyên đối trạng thái hóa đơn từ {showLabel(bill.trangThai)} thành {showLabel(keyStatus)}
          </DialogContentText>
        </DialogContent> */}
        <DialogContent>
          <div>
            <TextField
              label="Ghi chú của cửa hàng"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="ghiChuCuaHang"
              value={formData.ghiChuCuaHang}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
              error={!!errorMessages.ghiChuCuaHang}
              helperText={errorMessages.ghiChuCuaHang || ''}
            />
            <TextField
              label="Ghi chú của khách hàng"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="ghiChuKhachHang"
              value={formData.ghiChuKhachHang}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
              onClick={() => {
                openConfirmOkeDialog();
              }}
              disabled={loading}
            >
              Lưu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openConfirmOk}
        onClose={handleCloseOkeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn muốn : {'     '} {showLabel(keyStatus)} hóa đơn <strong> {id}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOkeDialog} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleSave(keyStatus);
              setOpenConfirmOk(false);
            }}
            color="primary"
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      {/* NoMessage */}
      <Dialog
        open={isDialogOpenNoMessage}
        onClose={handleCloseDialogNoMessage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ color: 'black' }}>
            <strong>
              Bạn muốn {/* {showLabel(keyStatus)} */}
              chắc chắn muốn chuyển trạng thái hóa đơn {id}
            </strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogNoMessage} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              // handleSave(keyStatus);
              handleSaveNoMessage();
              // setOpenConfirmOk(false);
            }}
            color="primary"
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      {pdfUrl && (
        <iframe
          ref={iframeRef}
          src={pdfUrl}
          width="0"
          height="0"
          style={{ display: 'none' }} // Ẩn iframe
          title="PDF"
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
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

export default NewTimeLine;
