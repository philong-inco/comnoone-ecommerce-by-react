import React from 'react';
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Chip,
  IconButton,
  Tooltip,
  TablePagination
} from '@mui/material';
import { getStatusColor, getStatusDisplayName } from 'utils/billUtil/billStatus';
import { Edit } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useNavigate } from 'react-router-dom';

function BillTable(props) {
  const { activeKey, handleTabChange, bills, page, pageSize, total, onPageChange } = props;
  const navigate = useNavigate();

  const tabList = [
    { key: '', label: 'TẤT CẢ' },
    { key: 'DON_MOI', label: 'Đơn mới' },
    { key: 'TREO', label: 'Hóa đơn chờ' },
    { key: 'CHO_XAC_NHAN', label: 'Chờ xác nhận' },
    { key: 'CHO_GIAO', label: 'Chờ giao' },
    { key: 'DANG_GIAO', label: 'Đang giao' },
    { key: 'HEN_LAI', label: 'Hẹn lại' },
    { key: 'HOAN_THANH', label: 'Hoàn thành' },
    { key: 'HUY', label: 'Hủy' }
  ];
  const handleNavigate = (ma) => {
    console.log('Code', ma);
    navigate(`/hoa-don/chi-tiet/${ma}`);
  };
  const calculateTotalAmount = (record) => {
    const totalProductAmount = record.tongTienPhaiTra;
    const shippingCost = record.tienShip || 0;
    const giamRank = record.tienGiamHangKhachHang;
    return totalProductAmount + shippingCost;
  };
  const columns = [
    { title: 'STT', dataIndex: 'key', key: 'key' },
    // { title: 'Chọn', key: 'selected' },
    { title: 'Mã', dataIndex: 'ma', key: 'ma' },
    { title: 'Tổng SP', dataIndex: 'tongSanPham', key: 'tongSanPham' },
    {
      title: 'Tổng số tiền',
      dataIndex: 'tongTienPhaiTra',
      key: 'tongTien',
      render: (text, record) => {
        const totalAmount = calculateTotalAmount(record);
        return totalAmount.toLocaleString();
      }
    },
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
        <Tooltip title={loaiHoaDon == 0 ? 'Bán tại quầy' : 'Hóa đơn bán giao hang'} arrow placement="top">
          <Chip
            size="small"
            sx={{
              width: 100,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              padding: '15px 4px'
            }}
            label={loaiHoaDon == 0 ? 'Tại quầy' : 'Ship'}
            color={loaiHoaDon == 0 ? 'secondary' : 'success'}
          />
        </Tooltip>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai) => (
        <Chip
          label={getStatusDisplayName(trangThai)}
          style={{ backgroundColor: getStatusColor(trangThai), color: '#fff' }}
          size="small"
          Chip
          sx={{
            width: '100%',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            padding: '15px 4px'
          }}
        />
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <>
          <Tooltip title="Xem chi tiết" placement="top">
            <IconButton color="secondary" onClick={() => handleNavigate(record.ma)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        marginTop: '10px',
        borderRadius: '10px',
        padding: '10px'
      }}
    >
      <Tabs
        value={activeKey}
        onChange={(event, newValue) => handleTabChange(newValue)}
        variant="fullWidth"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabList.map((tab) => (
          <Tab key={tab.key} label={tab.label} value={tab.key} sx={{ marginLeft: '10px', color: '#5F35B2' }} />
        ))}
      </Tabs>

      {tabList.map((tab) => (
        <Box key={tab.key} hidden={activeKey !== tab.key} sx={{ marginTop: '20px' }}>
          {activeKey === tab.key && (
            <>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.key} style={{ fontSize: '0.75rem' }}>
                          {column.title}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        {columns.map((column) => (
                          <TableCell key={column.key}>
                            {column.render ? column.render(bill[column.dataIndex], bill) : bill[column.dataIndex]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody> */}
                  <TableBody>
                    {bills.map((bill, index) => (
                      <TableRow key={bill.id}>
                        {columns.map((column) => (
                          <TableCell key={column.key} style={{ fontSize: '0.75rem' }}>
                            {/* Kiểm tra nếu cột là "STT", hiển thị số thứ tự */}
                            {column.key === 'key'
                              ? index + 1
                              : column.render
                                ? column.render(bill[column.dataIndex], bill)
                                : bill[column.dataIndex]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <Pagination
                sx={{ marginTop: '10px', textAlign: 'center' }}
                count={Math.ceil(total / pageSize)}
                page={page}
                onChange={(event, value) => onPageChange(value)}
              /> */}

              <TablePagination
                component="div"
                count={total}
                page={page - 1}
                onPageChange={(event, newPage) => onPageChange(newPage + 1)}
                rowsPerPage={pageSize}
                // onRowsPerPageChange={(event) => onPageSizeChange(event.target.value)}
                rowsPerPageOptions={[5]}
              />
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default BillTable;
