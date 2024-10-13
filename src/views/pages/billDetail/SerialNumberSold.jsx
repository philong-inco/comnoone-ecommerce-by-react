import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  Snackbar,
  Alert,
  DialogContent,
  Pagination,
  DialogActions,
  Checkbox,
  Chip,
  Button,
  Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findSerialNumberByProductIdAndCodeSerial } from 'services/admin/serial-number/serialNumber';
import {
  createSerialNumberSold,
  deletedById,
  getAllSerialNumberSoldByBillId
} from 'services/admin/serialNumberSold/serialNumberSoldService';
import ProductList from '../ban-hang/dialog-san-pham/ProductList';
import { Box } from '@mui/system';
import { getStatusSerialColor } from 'utils/serialUtil/serialUtil';
import { GridDeleteIcon } from '@mui/x-data-grid';

function SerialNumberSold(props) {
  const { id } = useParams();
  const { onLoading, bill, title } = props;
  // show sp
  const [showModal, setShowModal] = useState(false);
  // show dialog seril
  const [openDialog, setOpenDialog] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [serialNumberSold, setSerialNumberSold] = useState([]);
  // serial
  const [selectedRows, setSelectedRows] = useState([]);
  const [defaultSelectRows, setDefaultSelectRows] = useState([]);
  const [serials, setSerials] = useState([]);
  const [productId, setProductId] = useState(null);
  const [pageSerial, setPageSerial] = useState(1);
  const [sizeSerial, setSizeSerial] = useState(5);
  const [totalSerial, setTotalSerial] = useState(0);
  const [searchSerial, setSearchSerial] = useState('');

  const fetchSerialNumberSold = async () => {
    const response = await getAllSerialNumberSoldByBillId(id);
    if (response.status_code === 200) {
      setSerialNumberSold(response.data);
      const allSerialNumberIds = response.data.flatMap((product) => product.serialNumbers.map((serial) => serial.serialNumberId));
      // setSerialNumberInBill(allSerialNumberIds);
      setDefaultSelectRows(allSerialNumberIds);
      setSelectedRows(allSerialNumberIds);
    }
  };

  const fetchDelete = async (billCodeRequest, serialNumberIdsRequest) => {
    const response = await deletedById(billCodeRequest, serialNumberIdsRequest);
    if (response.status_code === 200) {
      fetchSerialNumberSold();
      onLoading();
      setSnackbarMessage('Xóa sản phẩm khỏi hóa đơn thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };
  useEffect(() => {
    fetchSerialNumberSold();
    console.log('Vòa Load  ffff');
  }, [bill]);
  // serial in product
  const fetchSerialNumberByProduct = async (productId, codeSerial, page, size) => {
    const response = await findSerialNumberByProductIdAndCodeSerial(productId, codeSerial || '', page - 1, size);
    if (response.status_code === 200) {
      setSerials(response.data.result);
      setTotalSerial(response.data.meta.total);
      setPageSerial(response.data.meta.page + 1);
    }
  };

  // delete all by product
  const handleDelete = (value) => {
    console.log('ID cần xóa', value);

    const serialNumberIds = value.serialNumbers.map((item) => item.serialNumberId);
    const data = {
      billCode: id,
      serialNumberIds: serialNumberIds
    };
    fetchDelete(id, serialNumberIds);
  };

  const handleSubmitSerials = async () => {
    const data = {
      billCode: id,
      listSerialNumberId: selectedRows,
      productId: productId
    };

    console.log('DATA REQUEST : ', data);

    const response = await createSerialNumberSold(data);
    if (response.status_code === 201) {
      setSnackbarMessage('Cập nhập số lượng sản phẩm thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpenDialog(false);
      setSelectedRows([]);
      setSearchSerial('');
      setPageSerial(1);
      setProductId(null);
      fetchSerialNumberSold();
      onLoading();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  //
  const handleOpenDialog = (id) => {
    setProductId(id);
    // xem lại
    fetchSerialNumberSold();
    fetchSerialNumberByProduct(id, searchSerial, pageSerial, 5);
    setOpenDialog(true);
  };
  console.log('BILL IN SERIAL NUMBER SOLD : ', bill);
  // phan trang serial
  const handleChangePageSerial = (newPage) => {
    setSelectedRows(selectedRows);
    setPageSerial(newPage);
    fetchSerialNumberByProduct(productId, searchSerial, newPage, sizeSerial);
  };

  const handleSearchChange = (event) => {
    const newSearchSerial = event.target.value;
    setSearchSerial(newSearchSerial.trim());
    fetchSerialNumberByProduct(productId, newSearchSerial, pageSerial, sizeSerial);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // load lại
  const handleLoadProductInBill = () => {
    fetchSerialNumberSold();
    onLoading();
  };

  //

  const handleCloseDialog = () => {
    setSearchSerial('');
    setOpenDialog(false);
    setSelectedRows([]);
    setDefaultSelectRows([]);
    setPageSerial(1);
    setProductId(null);
  };

  console.log('Select ROW ', selectedRows);
  console.log('Select Dèauk ', selectedRows);

  return (
    <>
      <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 2, borderRadius: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <Typography variant="h3">{title}</Typography>
            {/* <PdfForm serials={serialNumberSold} code={billInFo.ma} hiden={true} /> */}
            <Button
              hidden={
                bill.trangThai == 'DANG_GIAO' || bill.trangThai == 'HOAN_THANH' || bill.trangThai == 'CHO_GIAO' || bill.trangThai == 'HUY'
              }
              variant="contained"
              color="warning"
              onClick={handleShowModal}
              disabled={id ? false : true}
            >
              Thêm sản phẩm
            </Button>
            {/* <Button variant="contained" color="warning" onClick={handleSomeAction}>
              Load
            </Button> */}
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Mã SP</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thành tiền</TableCell>
                <TableCell>Serial</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serialNumberSold.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img src="https://via.placeholder.com/50" alt="Product" width="50" />
                  </TableCell>
                  <TableCell>{product.productDetailCode}</TableCell>
                  <TableCell>
                    {product.productName} <br />
                    <strong style={{ color: 'red' }}>{parseFloat(product.price).toLocaleString()} VNĐ</strong>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        disabled={
                          bill.trangThai == 'DANG_GIAO' ||
                          bill.trangThai == 'HOAN_THANH' ||
                          bill.trangThai == 'CHO_GIAO' ||
                          bill.trangThai == 'HUY'
                        }
                        onClick={() => handleOpenDialog(product.productDetailId)}
                      >
                        <RemoveCircleOutline />
                      </IconButton>

                      <TextField
                        disabled={
                          bill.trangThai == 'DANG_GIAO' ||
                          bill.trangThai == 'HOAN_THANH' ||
                          bill.trangThai == 'CHO_GIAO' ||
                          bill.trangThai == 'HUY'
                        }
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleOpenDialog(product.productDetailId)}
                        inputProps={{ min: 0 }}
                        sx={{
                          width: 50,
                          height: 30, // Điều chỉnh chiều cao
                          '& .MuiInputBase-input': {
                            padding: '5px 10px' // Điều chỉnh padding để phù hợp với chiều cao
                          }
                        }}
                      />

                      <IconButton
                        disabled={
                          bill.trangThai == 'DANG_GIAO' ||
                          bill.trangThai == 'HOAN_THANH' ||
                          bill.trangThai == 'CHO_GIAO' ||
                          bill.trangThai == 'HUY'
                        }
                        onClick={() => handleOpenDialog(product.productDetailId)}
                      >
                        <AddCircleOutline />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong style={{ color: 'red' }}>{parseFloat(product.quantity * product.price).toLocaleString()} VNĐ</strong>
                  </TableCell>
                  <TableCell>
                    <strong>
                      {product.serialNumbers.map((serial, index) => (
                        <span key={serial.serialNumberId}>
                          {serial.serialNumberCode}
                          {index < product.serialNumbers.length - 1 && ', '}
                        </span>
                      ))}
                    </strong>
                  </TableCell>
                  <TableCell>
                    {/* <Button
                      // disabled={
                      //   bill.trangThai == 'DANG_GIAO' ||
                      //   bill.trangThai == 'HOAN_THANH' ||
                      //   bill.trangThai == 'CHO_GIAO' ||
                      //   bill.trangThai == 'HUY'
                      // }
                      // sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                      onClick={() => handleDelete(product)}
                    >
                      <GridDeleteIcon />
                    </Button> */}
                    <Tooltip title={'Hủy toàn bộ sản phẩm : ' + product.productName} placement="top">
                      <IconButton
                        disabled={
                          bill.trangThai == 'DANG_GIAO' ||
                          bill.trangThai == 'HOAN_THANH' ||
                          bill.trangThai == 'CHO_GIAO' ||
                          bill.trangThai == 'HUY'
                        }
                        onClick={() => handleDelete(product)}
                        style={{ color: 'red' }}
                      >
                        <GridDeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="end" alignItems="center" mt={2}>
          <Typography variant="h4">
            Tổng tiền : <strong style={{ color: 'red' }}> {parseFloat(id ? bill.tongTienBanDau : 0 || 0).toLocaleString() || '0'} </strong>{' '}
            VNĐ
          </Typography>
        </Grid>
      </Grid>

      {/* show sp */}
      <Dialog open={showModal} onClose={handleCancel} maxWidth="xl" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3">Danh sách sản phẩm</Typography>
          <Button onClick={handleCancel}>Đóng</Button>
        </DialogTitle>
        {/* Danh sách sản phẩm */}
        <ProductList
          onLoading={() => {
            handleLoadProductInBill();
          }}
          selectedRowsInBill={selectedRows}
        />
      </Dialog>
      {/* <SerialInProductDiaLog
        openDialog={openDialog}
        onLoading={() => {
          onLoading();
        }}
        productId={productId}
      /> */}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            width: '700px'
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Danh sách serial</span>
            <TextField variant="outlined" size="small" label="Tìm kiếm" style={{ marginRight: '16px' }} onChange={handleSearchChange} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Chọn</TableCell>
                  <TableCell>Mã</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serials.map((row) => (
                  <TableRow key={row.id}>
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      // disabled={row.trangThai == 1}
                      disabled={row.trangThai === 1 && !selectedRows.includes(row.id) && !defaultSelectRows.includes(row.id)}
                    />
                    <TableCell>{row.ma}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.trangThai == 0 ? 'Chưa bán' : row.trangThai == 1 ? 'Đã bán' : 'Hủy'}
                        style={{ backgroundColor: getStatusSerialColor(row.trangThai), color: '#fff' }}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            sx={{ marginTop: '10px', textAlign: 'center' }}
            count={Math.ceil(totalSerial / sizeSerial)}
            page={pageSerial}
            onChange={(event, value) => handleChangePageSerial(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={() => {
              handleSubmitSerials();
            }}
            variant="contained"
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

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

export default SerialNumberSold;
