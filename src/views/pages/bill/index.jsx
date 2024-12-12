import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBill, getBillFilter } from 'services/admin/bill/billService';
import ComponentFilter from './ComponentFilter';
import BillTable from './BillTable';
import axios from 'axios';

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

  const getCurrentTimeInMilliseconds = (dateString, isStartOfDay = true) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Lỗi : ', dateString);
      return null;
    }
    if (isStartOfDay) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(23, 59, 59, 999);
    }
    return date.getTime();
  };

  const fetchBills = async () => {
    if (loading) return;
    setLoading(true);
    let filter = ` ( ma ~~ '${searchTerm.trim()}' or sdt ~~ '${searchTerm.trim()}' or email ~~ '${searchTerm.trim()}') `;
    if (billType) {
      filter += ` and loaiHoaDon:${billType}`;
    }
    if (status) {
      filter += ` and trangThai:'${status}'`;
    }
    if (fromDate && toDate) {
      filter += ` and ngayTao >: '${getCurrentTimeInMilliseconds(fromDate, true)}' and ngayTao <:'${getCurrentTimeInMilliseconds(toDate, false)}'   `;
    }

    try {
      const response = await getBillFilter(page - 1, pageSize, filter);
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

  const handlePrint = async () => {
    let filter = ` ( ma ~~ '${searchTerm.trim()}' or sdt ~~ '${searchTerm.trim()}' or email ~~ '${searchTerm.trim()}') `;
    if (billType) {
      filter += ` and loaiHoaDon:${billType}`;
    }
    if (status) {
      filter += ` and trangThai:'${status}'`;
    }
    if (fromDate && toDate) {
      filter += ` and ngayTao >: '${getCurrentTimeInMilliseconds(fromDate, true)}' and ngayTao <:'${getCurrentTimeInMilliseconds(toDate, false)}'   `;
    }

    try {
      const response = await axios({
        url: `http://localhost:8080/api/bills/export`,
        method: 'GET',
        params: { filter },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'hoadon.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Lỗi in hóa đơn: ', error);
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
      setFromDate(value);
    } else if (name === 'denNgay' && value !== null) {
      setToDate(value);
    }
    console.table(fromDate, toDate);
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

  const handleNavigate = (ma) => {
    console.log('Code', ma);

    navigate(`/hoa-don/chi-tiet/${ma}`);
  };

  return (
    <>
      <ComponentFilter
        handleSearch={handleSearch}
        handleCreateBill={handleCreateBill}
        onDateChange={handleDateChange}
        fromDate={fromDate}
        toDate={toDate}
        handleBillTypeChange={handleBillTypeChange}
        handlePrint={handlePrint}
      />
      <BillTable
        activeKey={activeKey}
        handleTabChange={handleTabChange}
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
