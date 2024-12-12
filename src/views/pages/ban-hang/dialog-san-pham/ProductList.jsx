import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import { FloatButton} from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import MainCard from 'ui-component/cards/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import {
  TextField,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Switch,
  Fab,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  Pagination,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
// My component
import ButtonAdd from 'views/pages/sanpham//ui-component/ButtonAdd.jsx';

import Loader from 'ui-component/Loader';
import { Box, maxHeight, maxWidth } from '@mui/system';
import { Download, Upload } from '@mui/icons-material';
import { MenuButton } from '@mui/base';
import MenuDownload from 'views/pages/sanpham//ui-component/Menu.jsx';
import ImportProduct from 'views/pages/sanpham//ui-component/ImportProduct.jsx';
import SelectDropdown from 'views/pages/sanpham/ui-component/SelectDropDown.jsx';
import { createSerialNumberSold, getAllSerialNumberSoldByBillId } from 'services/admin/serialNumberSold/serialNumberSoldService';
import { findSerialNumberByProductIdAndCodeSerial } from 'services/admin/serial-number/serialNumber';
import { getStatusSerialColor } from 'utils/serialUtil/serialUtil';

const ProductList = (props) => {
  const { id } = useParams();
  const { onLoading } = props;

  const navigate = useNavigate();
  const handleUpdate = (id) => {
    // navigate(`/sanpham/sua/${id}`);
  };
  const handleAdd = () => {
    // navigate(`/sanpham/add`);
  };

  // 0: tìm theo tên, 1: tìm theo mã
  const [typeOfFilter, setTypeOfFilter] = useState('0');

  const changeTypeOfFilter = (e) => {
    const type = e.target.value;
    setTypeOfFilter(type);
    if (type === '0') {
      setFilter((prev) => ({
        ...prev,
        tenSP: filter.ma,
        ma: ''
      }));
    } else if (type === '1') {
      setFilter((prev) => ({
        ...prev,
        ma: filter.tenSP,
        tenSP: ''
      }));
    }
  };

  const [resetFilter, setResetFilter] = useState(0);

  const cleanFilter = () => {
    setNhuCauChecked([]);
    setThuongHieuChecked([]);
    setTrangThaiChecked([]);
    setRamChecked([]);
    setCPUChecked([]);
    setVGAChecked([]);
    setManHinhChecked([]);
    setBanPhimChecked([]);
    setWebcamChecked([]);
    setHeDieuHanhChecked([]);
    setOCungChecked([]);
    setmauSacChecked([]);
    setTypeOfFilter('0');
    setFilter((prev) => ({
      ...prev,
      tenSP: '',
      ma: ''
    }));
    setResetFilter((prev) => prev + 1);
  };

  const urlFindFilter = 'http://localhost:8080/api/san-pham-chi-tiet/find/filter?';
  const urlFindFilter2 = 'http://localhost:8080/api/san-pham-chi-tiet/find/filter-page?';

  const [sanPham, setsanPham] = useState([]);
  const [filter, setFilter] = useState({
    page: 0,
    size: '5',
    tenSP: '',
    maSP: '',
    maSPCT: '',
    ngayTaoTruoc: '',
    ngayTaoSau: '',
    ngaySuaTruoc: '',
    ngaySuaSau: '',
    trangThai: '1',
    nhuCau: '',
    thuongHieu: '',
    ram: '',
    mauSac: '',
    cpu: '',
    vga: '',
    webcam: '',
    oCung: '',
    manHinh: '',
    heDieuHanh: '',
    banPhim: ''
    // giaNhoHon: '',
    // giaLonHon: ''
  });

  // Data for filters
  const [nhuCau, setNhuCau] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [ram, setRam] = useState([]);
  const [mauSac, setmauSac] = useState([]);
  const [CPU, setCPU] = useState([]);
  const [VGA, setVGA] = useState([]);
  const [webcam, setWebcam] = useState([]);
  const [oCung, setOCung] = useState([]);
  const [manHinh, setManHinh] = useState([]);
  const [heDieuHanh, setHeDieuHanh] = useState([]);
  const [banPhim, setBanPhim] = useState([]);
  const [trangThai, setTrangThai] = useState([
    { id: 1, ten: 'Hoạt động' },
    { id: 0, ten: 'Đã tắt' }
  ]);

  // Danh sách các giá trị được chọn
  const [nhuCauChecked, setNhuCauChecked] = useState([]);
  const [thuongHieuChecked, setThuongHieuChecked] = useState([]);
  const [ramChecked, setRamChecked] = useState([]);
  const [mauSacChecked, setmauSacChecked] = useState([]);
  const [CPUChecked, setCPUChecked] = useState([]);
  const [VGAChecked, setVGAChecked] = useState([]);
  const [webcamChecked, setWebcamChecked] = useState([]);
  const [oCungChecked, setOCungChecked] = useState([]);
  const [manHinhChecked, setManHinhChecked] = useState([]);
  const [heDieuHanhChecked, setHeDieuHanhChecked] = useState([]);
  const [banPhimChecked, setBanPhimChecked] = useState([]);
  const [trangThaiChecked, setTrangThaiChecked] = useState([]);

  // serial
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [defaultSelectRows, setDefaultSelectRows] = useState([]);
  const [serials, setSerials] = useState([]);
  const [productId, setProductId] = useState(null);
  const [pageSerial, setPageSerial] = useState(1);
  const [sizeSerial, setSizeSerial] = useState(5);
  const [totalSerial, setTotalSerial] = useState(0);
  const [searchSerial, setSearchSerial] = useState('');

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseDialog = () => {
    setSearchSerial('');
    setOpenDialog(false);
    setSelectedRows([]);
    setDefaultSelectRows([]);
    setPageSerial(1);
    setProductId(null);
  };
  // serial đã có
  const fetchSerialNumberSold = async () => {
    const response = await getAllSerialNumberSoldByBillId(id);
    if (response.status_code === 200) {
      const allSerialNumberIds = response.data.flatMap((product) => product.serialNumbers.map((serial) => serial.serialNumberId));
      setDefaultSelectRows(allSerialNumberIds);
      setSelectedRows(allSerialNumberIds);
    }
  };
  // mở chọn serial
  const handleOpenDialog = (id) => {
    setProductId(id);
    fetchSerialNumberSold();
    fetchSerialNumberByProduct(id, searchSerial, pageSerial, 5);
    setOpenDialog(true);
  };

  const fetchSerialNumberByProduct = async (productId, codeSerial, page, size) => {
    const response = await findSerialNumberByProductIdAndCodeSerial(productId, codeSerial || '', page - 1, size);
    if (response.status_code === 200) {
      setSerials(response.data.result);
      setTotalSerial(response.data.meta.total);
      setPageSerial(response.data.meta.page + 1);
    }
  };

  const handleChangePageSerial = (newPage) => {
    setSelectedRows(selectedRows);
    setPageSerial(newPage);
    fetchSerialNumberByProduct(productId, searchSerial, newPage, sizeSerial);
  };

  const handleSearchChange = (event) => {
    const newSearchSerial = event.target.value;
    setSearchSerial(newSearchSerial.trim());
    setPageSerial(1);
    fetchSerialNumberByProduct(productId, newSearchSerial, 1, sizeSerial);
  };
  console.log('FILTER : ', filter);

  // thêm serial
  const handleSubmitSerials = async () => {
    const data = {
      billCode: id,
      listSerialNumberId: selectedRows,
      productId: productId
    };
    console.log('DATA REQUEST : ', data);

    const response = await createSerialNumberSold(data);
    if (response.status_code === 201) {
      setSnackbarMessage('Cập nhập số lượng thành công');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpenDialog(false);
      setSelectedRows([]);
      setSearchSerial('');
      setPageSerial(1);
      setProductId(null);
      // setSelectedProduct(null);
      onLoading();
      // fetchSerialNumberSold();
      // fetchBillInFo();
    }
  };
  // tích chọn serial
  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  // ---------------------------------------
  useEffect(() => {
    loadProducts();
    // Load filter options
    loadFilterOptions();
  }, []);

  // useEffect Attribute Checked

  useEffect(() => {
    // const trangThaiInt = trangThaiChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      trangThai: 1
    }));
  }, [trangThaiChecked]);

  useEffect(() => {
    const idString = nhuCauChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      nhuCau: idString
    }));
  }, [nhuCauChecked]);

  useEffect(() => {
    const idString = thuongHieuChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      thuongHieu: idString
    }));
  }, [thuongHieuChecked]);

  useEffect(() => {
    const idString = ramChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      ram: idString
    }));
  }, [ramChecked]);

  useEffect(() => {
    const idString = CPUChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      cpu: idString
    }));
  }, [CPUChecked]);

  useEffect(() => {
    const idString = VGAChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      vga: idString
    }));
  }, [VGAChecked]);

  useEffect(() => {
    const idString = banPhimChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      banPhim: idString
    }));
  }, [banPhimChecked]);

  useEffect(() => {
    const idString = manHinhChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      manHinh: idString
    }));
  }, [manHinhChecked]);

  useEffect(() => {
    const idString = webcamChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      webcam: idString
    }));
  }, [webcamChecked]);

  useEffect(() => {
    const idString = heDieuHanhChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      heDieuHanh: idString
    }));
  }, [heDieuHanhChecked]);

  useEffect(() => {
    const idString = mauSacChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      mauSac: idString
    }));
  }, [mauSacChecked]);

  useEffect(() => {
    const idString = oCungChecked.join(',');
    setFilter((prev) => ({
      ...prev,
      oCung: idString
    }));
  }, [oCungChecked]);

  // useEffect Attribute Checked

  const handleTextFieldSearch = (event) => {
    const keyword = event.target.value.toString().trim();
    if (typeOfFilter === '0') {
      setFilter((prev) => ({
        ...prev,
        tenSP: keyword,
        maSP: ''
        // maSPCT: ''
      }));
    } else if (typeOfFilter === '1') {
      setFilter((prev) => ({
        ...prev,
        maSP: keyword,
        // maSPCT: keyword,
        tenSP: ''
      }));
    }
  };

  const [totalElement, setTotalElement] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [filter]);

  const loadProducts = async () => {
    const queryString = Object.entries(filter)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const urlQuery = urlFindFilter2 + queryString;
    const result = await axios.get(urlQuery);
    setsanPham(result.data.data);
    setTotalElement(parseInt(result.data.totalElement));
  };

  const loadFilterOptions = async () => {
    // get các bảng
    const nhuCauResult = await axios.get(`http://localhost:8080/api/nhu-cau/all-list`);
    const thuongHieuResult = await axios.get(`http://localhost:8080/api/thuong-hieu/all-list`);
    const ramResult = await axios.get(`http://localhost:8080/api/ram/all-list`);
    const mauSacResult = await axios.get(`http://localhost:8080/api/mau-sac/all-list`);
    const cpuResult = await axios.get(`http://localhost:8080/api/cpu/all-list`);
    const vgaResult = await axios.get(`http://localhost:8080/api/vga/all-list`);
    const webcamResult = await axios.get(`http://localhost:8080/api/webcam/all-list`);
    const oCungResult = await axios.get(`http://localhost:8080/api/o-cung/all-list`);
    const manHinhResult = await axios.get(`http://localhost:8080/api/man-hinh/all-list`);
    const heDieuHanhResult = await axios.get(`http://localhost:8080/api/he-dieu-hanh/all-list`);
    const banPhimResult = await axios.get(`http://localhost:8080/api/ban-phim/all-list`);

    setNhuCau(nhuCauResult.data.data);
    setThuongHieu(thuongHieuResult.data.data);
    setRam(ramResult.data.data);
    setmauSac(mauSacResult.data.data);
    setCPU(cpuResult.data.data);
    setVGA(vgaResult.data.data);
    setWebcam(webcamResult.data.data);
    setOCung(oCungResult.data.data);
    setManHinh(manHinhResult.data.data);
    setHeDieuHanh(heDieuHanhResult.data.data);
    setBanPhim(banPhimResult.data.data);
  };

  function formatNumber(value) {
    const cleanedValue = String(value || '').replace(/\D/g, '');
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  // MUI UI
  const columns = [
    { id: 'maSPCT', label: 'Mã', minWidth: 70 },
    { id: 'anh', label: 'Ảnh', minWidth: 70 },

    { id: 'sanPham', label: 'Tên', minWidth: 70 },
    // {
    //   id: 'giaBan',
    //   label: 'Giá sản phẩm',
    //   minWidth: 100,
    //   align: 'left',
    //   format: (value) => parseFloat(value || 0).toLocaleString()
    // },
    // {
    //   id: 'giaSauKhuyenMai',
    //   label: 'Giá bán',
    //   minWidth: 100,
    //   align: 'left',
    //   format: (value) => (value !== null ? parseFloat(value).toLocaleString() : '')
    // },
    // {
    //   id: 'soTienDuocGiam',
    //   label: 'Số tiền được giảm',
    //   minWidth: 100,
    //   align: 'left',
    //   format: (value) => (value !== null ? parseFloat(value).toLocaleString() : '')
    // },
    { id: 'giaHienThi', label: 'Giá hiển thị', minWidth: 100, align: 'left' },

    {
      id: 'hanhDong',
      label: 'Hành động',
      minWidth: 30,
      align: 'center'
    }
  ];

  const handleSwitchChange = (id) => (e) => {
    e.target.checked ? suaTrangThai(id, 1) : suaTrangThai(id, 0);
  };

  const suaTrangThai = (id, status) => {
    axios
      .get(`http://localhost:8080/api/san-pham/change-status?id=${id}&status=${status}`)
      .then((response) => {
        loadProducts();
      })
      .catch((error) => {
        loadProducts();
      });
  };

  const handleChangePage = (event, newPage) => {
    setFilter((prev) => ({
      ...prev,
      page: newPage
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setFilter((prev) => ({
      ...prev,
      size: event.target.value
    }));
  };
  // MUI UI

  // SELECT DROPDOWN

  const loadProductInBill = () => {
    onLoading();
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <MainCard label="Danh sách sản phẩm">
        <div key={resetFilter}>
          <Paper>
            <div style={{ display: 'flex', padding: 10, paddingTop: 20 }}>
              <TextField
                sx={{ maxHeight: '10px' }}
                color="secondary"
                onChange={handleTextFieldSearch}
                id="outlined-basic"
                label="Nhập từ khóa"
                variant="outlined"
              />

              <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center' }}>
                <FormControl>
                  {/* <FormLabel id="demo-controlled-radio-buttons-group">Tìm theo:</FormLabel> */}
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={typeOfFilter}
                    row
                    onChange={changeTypeOfFilter}
                  >
                    <FormControlLabel value="0" control={<Radio color="secondary" size="small" />} label="Tên" />
                    <FormControlLabel value="1" control={<Radio color="secondary" size="small" />} label="Mã" />
                  </RadioGroup>
                </FormControl>
              </div>

              <div onClick={cleanFilter} style={{ marginLeft: 20, marginTop: 10, marginRight: 20 }}>
                <FilterAltOffOutlinedIcon color="secondary" fontSize="large" />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SelectDropdown list={nhuCau} setListChecked={setNhuCauChecked} nameDropDown={'Nhu cầu'} />
              <SelectDropdown list={thuongHieu} setListChecked={setThuongHieuChecked} nameDropDown={'Thương hiệu'} />
              {/* <SelectDropdown list={trangThai} setListChecked={setTrangThaiChecked} nameDropDown={'Trạng thái'} /> */}
              <SelectDropdown list={ram} setListChecked={setRamChecked} nameDropDown={'RAM'} />
              <SelectDropdown list={CPU} setListChecked={setCPUChecked} nameDropDown={'CPU'} />
              <SelectDropdown list={VGA} setListChecked={setVGAChecked} nameDropDown={'VGA'} />
              <SelectDropdown list={manHinh} setListChecked={setManHinhChecked} nameDropDown={'Màn hình'} />
              <SelectDropdown list={banPhim} setListChecked={setBanPhimChecked} nameDropDown={'Bàn phím'} />
              <SelectDropdown list={oCung} setListChecked={setOCungChecked} nameDropDown={'Ổ cứng'} />
              <SelectDropdown list={mauSac} setListChecked={setmauSacChecked} nameDropDown={'Màu sắc'} />
              <SelectDropdown list={heDieuHanh} setListChecked={setHeDieuHanhChecked} nameDropDown={'Hệ điều hành'} />
              <SelectDropdown list={webcam} setListChecked={setWebcamChecked} nameDropDown={'Webcam'} />
            </div>
          </Paper>
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 700 }}>STT</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 700 }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sanPham
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const rowIndex = index + 1;
                    return (
                      // lặp từng row
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell align="center">{rowIndex}</TableCell>
                        {/* lặp từng cell dựa vào tên cot */}
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (column.id === 'anh') {
                            const listAnh = row.listUrlAnhSanPham ? row.listUrlAnhSanPham.split(',') : [];
                            const anhDauTien = listAnh.length > 0 ? listAnh[0].trim() : 'https://via.placeholder.com/50';
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <img src={anhDauTien} alt="Ảnh sản phẩm" width="50" />
                              </TableCell>
                            );
                          }
                          if (column.id === 'hanhDong') {
                            const valueTrangThai = row['trangThai'];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  //  onClick={loadProductInBill}
                                  onClick={() => handleOpenDialog(row.id)}
                                >
                                  Chọn serial
                                </Button>
                              </TableCell>
                            );
                          }
                          if (column.id === 'giaHienThi') {
                            value = row.giaSauKhuyenMai !== null ? row.giaSauKhuyenMai : row.giaBan;
                            value = parseFloat(value).toLocaleString() + ' đ';
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'sanPham' ? (
                                <>{`${row.tenSanPham} [ ${row.ram} - ${row.cpu} - ${row.ocung} -  ${row.mauSac} ]`}</>
                              ) : column.format ? (
                                <>
                                  <strong>
                                    <span style={{ color: 'red' }}>{column.format(value) ? column.format(value) + ' VNĐ' : '-'}&nbsp;</span>
                                  </strong>
                                </>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={totalElement}
            rowsPerPage={parseInt(filter.size)}
            page={filter.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </MainCard>

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

      {/*  */}
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
};

export default ProductList;
