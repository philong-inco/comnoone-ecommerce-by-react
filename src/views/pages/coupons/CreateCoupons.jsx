import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Snackbar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TableContainer
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { createPGG } from 'services/admin/coupons/couponsService';
import { getPageKH } from 'services/admin/customer/customerService';
import { useNavigate } from 'react-router-dom';

function CreateCoupons() {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerCoupons, setCustomerCoupons] = useState([]);
  const [showCustomerTable, setShowCustomerTable] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: ''
  });

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectAll}
          onChange={() => {
            const newSelectAll = !selectAll;
            setSelectAll(newSelectAll);
            if (newSelectAll) {
              setCustomerCoupons(customers.map((customer) => customer.id));
            } else {
              setCustomerCoupons([]);
            }
          }}
        />
      ),
      key: 'checkbox',
      render: (record) => <Checkbox checked={customerCoupons.includes(record.id)} onChange={() => onSelectChange(record.id)} />
    },
    {
      title: 'Họ và tên',
      key: 'ten',
      render: (record) => `${record.ho ? record.ho : ''} ${record.ten ? record.ten : ''}`.trim() || 'N/A'
    },
    { title: 'SDT', key: 'sdt' },
    { title: 'Email', key: 'email', render: (text) => (text ? text : 'N/A') }
  ];

  const onSelectChange = (customerId) => {
    setCustomerCoupons((prev) => (prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setFormValues({ ...formValues, [name]: date });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      ...formValues,
      listKhachHang: customerCoupons,
      ngayBatDau: formValues.ngayBatDau ? moment(formValues.ngayBatDau).format('YYYY-MM-DD') : undefined,
      ngayHetHan: formValues.ngayKetThuc ? moment(formValues.ngayKetThuc).format('YYYY-MM-DD') : undefined
    };
    console.log(data);
    try {
      const response = await createPGG(data);
      if (response.status_code === 200 || response.status_code === 201) {
        setFormValues({});
        setCustomerCoupons([]);
        setSelectAll(false);
        setNotification({
          open: true,
          message: 'Tạo phiếu giảm giá thành công!',
          type: 'success'
        });
        navigate('/phieugiamgia/danhsach');
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Có lỗi xảy ra khi tạo phiếu giảm giá!',
        type: 'error'
      });
    } finally {
    }
  };

  const handlePhamViApDungChange = (event) => {
    const value = event.target.value;
    setFormValues({ ...formValues, phamViApDung: value });
    setShowCustomerTable(value === '2');
  };

  const fetchApiAllCustomer = async () => {
    setLoading(true);
    try {
      const response = await getPageKH();
      if (response) {
        setCustomers(response.content);
      } else {
        setNotification({
          open: true,
          message: 'Không thể tải dữ liệu khách hàng!',
          type: 'error'
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Có lỗi xảy ra khi tải dữ liệu khách hàng!',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiAllCustomer();
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container>
          <Grid item xs={11} md={6}>
            <h4>Thông tin phiếu giảm giá</h4>
          </Grid>
          <Grid item xs={11} md={6}>
            <h4> Danh sách khác hàng</h4>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={11} md={6} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Mã" name="ma" value={formValues.ma || ''} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Tên phiếu" name="ten" value={formValues.ten || ''} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Loại giảm giá</FormLabel>
                    <RadioGroup row name="loaiGiamGia" value={formValues.loaiGiamGia || '1'} onChange={handleChange}>
                      <FormControlLabel value="1" control={<Radio />} label="%" />
                      <FormControlLabel value="2" control={<Radio />} label="VND" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Phạm vi</FormLabel>
                    <RadioGroup row name="phamViApDung" value={formValues.phamViApDung || '1'} onChange={handlePhamViApDungChange}>
                      <FormControlLabel value="1" control={<Radio />} label="Công khai" />
                      <FormControlLabel value="2" control={<Radio />} label="Riêng tư" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Số lượng phiếu"
                    name="soLuong"
                    type="number"
                    value={formValues.soLuong || ''}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Giá trị giảm"
                    name="giaTriGiamGia"
                    type="number"
                    value={formValues.giaTriGiamGia || ''}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Đơn tối thiểu"
                    name="giaTriDonToiThieu"
                    type="number"
                    value={formValues.giaTriDonToiThieu || ''}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Giá trị giảm tối đa"
                    name="giamToiGia"
                    type="number"
                    value={formValues.giamToiGia || ''}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Ngày bắt đầu"
                    value={formValues.ngayBatDau || null}
                    onChange={(date) => handleDateChange('ngayBatDau', date)}
                    renderInput={(params) => <TextField {...params} />}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Ngày kết thúc"
                    value={formValues.ngayKetThuc || null}
                    onChange={(date) => handleDateChange('ngayKetThuc', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Mô tả" name="moTa" value={formValues.moTa || ''} onChange={handleChange} fullWidth multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Tạo mới'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {showCustomerTable && (
              <Grid item xs={11} md={6} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', marginLeft: '0px' }}>
                <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.key}>{column.title}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <Checkbox checked={customerCoupons.includes(customer.id)} onChange={() => onSelectChange(customer.id)} />
                          </TableCell>
                          <TableCell>{`${customer.ho ? customer.ho : ''} ${customer.ten ? customer.ten : ''}`.trim() || 'N/A'}</TableCell>
                          <TableCell>{customer.sdt}</TableCell>
                          <TableCell>{customer.email ? customer.email : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {loading && <CircularProgress />}
                </TableContainer>
              </Grid>
            )}
          </Grid>
        </form>
        <Snackbar
          open={notification.open}
          onClose={() => setNotification({ ...notification, open: false })}
          message={notification.message}
          autoHideDuration={6000}
        />
      </LocalizationProvider>
    </>
  );
}

export default CreateCoupons;
