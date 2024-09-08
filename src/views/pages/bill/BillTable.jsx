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
  IconButton
} from '@mui/material';
import { getStatusColor, getStatusDisplayName } from 'utils/billUtil/billStatus';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function BillTable(props) {
  const { activeKey, handleTabChange, bills, page, pageSize, total, onPageChange } = props;
  const navigate = useNavigate();

  const tabList = [
    { key: '', label: 'TẤT CẢ' },
    { key: 'DON_MOI', label: 'Đơn mới' },
    { key: 'CHO_THANH_TOAN', label: 'Chờ thanh toán' },
    { key: 'CHO_XAC_NHAN', label: 'Chờ xác nhận' },
    { key: 'CHO_GIAO', label: 'Chờ giao' },
    { key: 'DANG_GIAO', label: 'Đang giao' },
    { key: 'TRA_HANG_HOAN_TIEN', label: 'Trả hàng hoàn tiền' },
    { key: 'HOAN_THANH', label: 'Hoàn thành' },
    { key: 'HUY', label: 'Hủy' }
  ];
  const handleNavigate = (ma) => {
    console.log('Code', ma);

    navigate(`/hoa-don/chi-tiet/${ma}`);
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
      render: (text, record) => (
        <IconButton onClick={() => handleNavigate(record.ma)}>
          <Edit />
        </IconButton>
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
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabList.map((tab) => (
          <Tab key={tab.key} label={tab.label} value={tab.key} sx={{ marginLeft: '10px' }} />
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
                        <TableCell key={column.key}>{column.title}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        {columns.map((column) => (
                          <TableCell key={column.key}>
                            {column.render ? column.render(bill[column.dataIndex], bill) : bill[column.dataIndex]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Pagination
                sx={{ marginTop: '10px', textAlign: 'center' }}
                count={Math.ceil(total / pageSize)}
                page={page}
                onChange={(event, value) => onPageChange(value)}
              />
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default BillTable;
