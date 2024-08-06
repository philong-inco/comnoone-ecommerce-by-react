import { Search } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBill, getBillFilter } from 'services/admin/bill/billService';
import ComponentFilter from './ComponentFilter';
import BillTable from './BillTable';
import { getStatusColor, getStatusDisplayName } from 'utils/billUtil/billStatus';

function Bill() {
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState('');

  const [bills, setBills] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [billType, setBillType] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCurrentTimeInSeconds = (date) => {
    return date instanceof Date ? Math.floor(date.valueOf() / 1000) : null;
  };

  const fetchBills = async () => {
    if (loading) return;
    setLoading(true);
    let filter = ` ( ma ~~ '${searchTerm}' or sdt ~~ '${searchTerm}' or email ~~ '${searchTerm}') `;
    if (billType) {
      filter += ` and loaiHoaDon:${billType}`;
    }
    if (status) {
      filter += ` and trangThai:'${status}'`;
    }
    if (fromDate && toDate) {
      filter += ` and ngayTao >: '${getCurrentTimeInSeconds(fromDate)}' and ngayTao <:'${getCurrentTimeInSeconds(toDate)}'`;
    }

    try {
      const response = await getBillFilter(page - 1, pageSize, filter);
      console.log(response);

      if (response.status_code === 200) {
        setBills(response.data.result);
        setPage(response.data.meta.page + 1);
        setPageSize(response.data.meta.pageSize);
        setTotal(response.data.meta.total);
      }
    } catch (error) {
      console.error('Lỗi : ', error);
    } finally {
      setLoading(false);
    }
  };
  const onPageChange = (page) => {
    console.log(`PAGE ${page}`);
    setPage(page);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleBillTypeChange = (e) => {
    setBillType(e.target.value);
  };

  const handleDateChange = (name, value) => {
    const date = new Date(value);

    if (name === 'tuNgay' && value !== null) {
      setFromDate(new Date(date.setHours(0, 0, 0, 0)));
    } else if (name === 'denNgay' && value !== null) {
      setToDate(new Date(date.setHours(23, 59, 59, 999)));
    }
  };
  const handleCreateBill = async () => {
    try {
      const response = await createBill();
      if (response.status_code === 201) {
        // notification.success({
        //   message: 'Success',
        //   description: `Thông báo : ${response.data.ma}`,
        //   showProgress: true,
        //   duration: 2,
        // })
        alert('Thông báo Oke : ' + response.data.ma);
        fetchBills();
      }
    } catch (error) {
      // notification.error({
      //   message: 'Error',
      //   description: `Thông báo : ${error.response.data.error}`,
      //   showProgress: true,
      //   duration: 2,
      // })
      alert('Thông báo Error : ' + error.response.data.error);
    }
  };
  useEffect(() => {
    fetchBills();
  }, [fromDate, toDate, searchTerm, billType, status, page]);

  const handleTabChange = (key) => {
    setPage(1);
    setStatus(key);
    setActiveKey(key);
  };

  const handleNavigate = (id) => {
    // navigate(`/bills/detail/${id}`);
  };

  const columns = [
    { title: '#', dataIndex: 'key', key: 'key' },
    { title: 'Mã', dataIndex: 'ma', key: 'ma' },
    { title: 'Tổng SP', dataIndex: 'tongSanPham', key: 'tongSanPham' },
    { title: 'Tổng số tiền', dataIndex: 'tongTien', key: 'tongTien' },
    {
      title: 'Tên khách hàng',
      dataIndex: 'tenKhachHang',
      key: 'tenKhachHang',
      render: (tenKhachHang) => (tenKhachHang == null ? 'Khách lẻ' : tenKhachHang)
    },
    { title: 'SDT', dataIndex: 'sdt', key: 'sdt' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Ngày tạo', dataIndex: 'ngayTao', key: 'ngayTao' },
    {
      title: 'Loại hóa đơn',
      dataIndex: 'loaiHoaDon',
      key: 'loaiHoaDon',
      render: (loaiHoaDon) => (
        <Chip label={loaiHoaDon == 0 ? 'Tại quầy' : 'Online'} color={loaiHoaDon == 0 ? 'primary' : 'success'} size="small" />
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai) => (
        <Chip label={getStatusDisplayName(trangThai)} style={{ backgroundColor: getStatusColor(trangThai), color: '#fff' }} size="small" />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (recorder) => (
        <IconButton onClick={() => handleNavigate(recorder.id)}>
          <Search />
        </IconButton>
      )
    }
  ];

  console.table(fromDate, toDate);

  return (
    <>
      <ComponentFilter
        handleSearch={handleSearch}
        handleCreateBill={handleCreateBill}
        onDateChange={handleDateChange}
        fromDate={fromDate}
        toDate={toDate}
        handleBillTypeChange={handleBillTypeChange}
      />
      <BillTable
        activeKey={activeKey}
        handleTabChange={handleTabChange}
        columns={columns}
        bills={bills}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default Bill;
