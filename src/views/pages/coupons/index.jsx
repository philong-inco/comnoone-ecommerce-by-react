import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
  Paper,
  Chip,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, MoreHoriz as MoreHorizIcon, Sync as SyncIcon } from '@mui/icons-material';
import { deletedCoupons, filterCoupons, getPGGPage } from 'services/admin/coupons/couponsService';
import './index.css';
import Notification from 'views/Notification';
import CouponsCustomer from './CouponsCustomer';
import FilterCoupons from './FilterCoupons';
import { toDate } from 'date-fns';

function PGGTable() {
  const navigate = useNavigate();
  let sttCounter = 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [listPhieuGiamGia, setListPhieuGiamGia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ma, setMa] = useState('');
  const [phamViApDung, setPhamViApDung] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [loaiPhieu, setLoaiPhieu] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState(null);
  const [ngayHetHan, setNgayHetHan] = useState(null);

  const fetchApi = async (currentPage, size) => {
    try {
      let filterString = `(ma ~~ '${ma}')`;
      if (phamViApDung) {
        filterString += ` and phamViApDung = ${phamViApDung}`;
      }
      if (trangThai) {
        filterString += ` and trangThai = ${trangThai}`;
      }
      if (loaiPhieu) {
        filterString += ` and loaiGiamGia = ${loaiPhieu}`;
      }
      if (ngayBatDau && ngayHetHan) {
        filterString += ` and ngayBatDau>: '${ngayBatDau}' and ngayHetHan<: '${ngayHetHan}' `;
      }
      const response = await filterCoupons(currentPage, size, filterString);
      if (response.status_code === 200) {
        setListPhieuGiamGia(response.data.result);
        setCurrentPage(response.data.meta.page + 1);
        setSize(response.data.meta.pageSize);
        setTotalItems(response.data.meta.total);
      } else {
        alert('Failed to fetch data from API');
      }
    } catch (error) {
      console.log(error);

      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchApi(currentPage, size);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentPage, size, ma, phamViApDung, trangThai, loaiPhieu, loading, ngayBatDau, ngayHetHan]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    const response = await deletedCoupons(id);
    if (response) {
      setLoading(!loading);
      alert('Hủy thành công');
    } else {
      alert('Thất bại');
    }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setCurrentPage(1);
  };

  const handleNavigate = (path, id) => {
    navigate(`/phieugiamgia/${path}/${id}`);
  };

  const handleOpenModal = (coupon) => {
    setSelectedCoupon(coupon);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleSearch = (value) => {
    setMa(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setTrangThai(e.target.value);
    setCurrentPage(1);
  };

  const handlePhamViChange = (e) => {
    setPhamViApDung(e.target.value);
    setCurrentPage(1);
  };

  const handleLoaiPhieuChange = (e) => {
    setLoaiPhieu(e.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (event, newValue) => {
    setTrangThai(newValue);
    setCurrentPage(1);
  };

  const columns = [
    { title: 'STT', key: 'STT' },
    { title: 'Mã phiếu', key: 'ma' },
    { title: 'Tên phiếu', key: 'ten' },
    { title: 'Loại giảm giá', key: 'loaiGiamGia' },
    { title: 'Phạm vi', key: 'phamViApDung' },
    { title: 'Số lượng', key: 'soLuong' },
    { title: 'Giá trị giảm', key: 'giaTriGiamGia' },
    { title: 'Giá trị đơn tối thiểu', key: 'giaTriDonToiThieu' },
    { title: 'Giá trị giảm tối đa', key: 'giamToiGia' },
    { title: 'Bắt đầu và kết thúc', key: 'ngayBatDau' },
    { title: 'Trạng thái', key: 'trangThai' },
    { title: 'Action', key: 'action' }
  ];

  const tabList = [
    { key: '', label: 'Tất cả' },
    { key: '0', label: 'Chưa đến' },
    { key: '1', label: 'Đang áp dung' },
    { key: '2', label: 'Hết hạn' },
    { key: '3', label: 'Hủy' }
  ];

  const handleDateChange = (name, value) => {
    if (name === 'ngayBatDau') {
      setNgayBatDau(value);
    } else if (name === 'ngayHetHan') {
      setNgayHetHan(value);
    }
  };

  return (
    <>
      <Link to="/phieugiamgia/them" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>
          Thêm mới
        </Button>
      </Link>

      <FilterCoupons
        ngayBatDau={ngayBatDau}
        ngayHetHan={ngayHetHan}
        onDateChange={handleDateChange}
        handleSearch={handleSearch}
        handlePhamViChange={handlePhamViChange}
        handleLoaiPhieuChange={handleLoaiPhieuChange}
      />

      <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 5 }}>
        <Tabs
          value={trangThai}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ backgroundColor: 'white', borderRadius: '10px 10px 0 0', padding: '10px' }}
        >
          {tabList.map((tab) => (
            <Tab
              key={tab.key}
              value={tab.key}
              label={
                <Badge
                  badgeContent={5}
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -6,
                      top: -5,
                      fontSize: '0.75rem',
                      height: '16px',
                      minWidth: '16px'
                    }
                  }}
                >
                  {tab.label}
                </Badge>
              }
            />
          ))}
        </Tabs>
        <TableContainer component={Paper}>
          <Table size="small" className="table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key}>{column.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listPhieuGiamGia.map((record, index) => (
                <TableRow key={record.id}>
                  <TableCell className="table-cell-small">{sttCounter + index + 1}</TableCell>
                  <TableCell className="table-cell-small">{record.ma}</TableCell>
                  <TableCell className="table-cell-small">{record.ten}</TableCell>
                  <TableCell className="table-cell-small">
                    {record.loaiGiamGia === 1 ? <Typography color="magenta"> %</Typography> : <Typography>VND</Typography>}
                  </TableCell>
                  <TableCell className="table-cell-small">
                    {record.phamViApDung === 2 ? (
                      <Typography color="gold">Riêng tư</Typography>
                    ) : (
                      <Typography color="cyan">Công khai</Typography>
                    )}
                  </TableCell>
                  <TableCell className="table-cell-small">{record.soLuong != null ? record.soLuong : `Không giới hạn `}</TableCell>
                  <TableCell className="table-cell-small">
                    {record.loaiGiamGia === 1
                      ? `${record.giaTriGiamGia} %`
                      : record.giaTriGiamGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </TableCell>
                  <TableCell className="table-cell-small">
                    {record.giaTriDonToiThieu !== null
                      ? record.giaTriDonToiThieu.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                      : '0 ₫'}
                  </TableCell>
                  <TableCell className="table-cell-small">
                    {record.giamToiGia !== null
                      ? record.giamToiGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                      : 'Không giới hạn'}
                  </TableCell>
                  <TableCell className="table-cell-small">
                    {new Date(record.ngayBatDau).toLocaleDateString()} | {new Date(record.ngayHetHan).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="table-cell-small">
                    {(() => {
                      let color = '';
                      let text = '';

                      switch (record.trangThai) {
                        case 1:
                          color = 'success';
                          text = 'Đang áp dụng';
                          break;
                        case 2:
                          color = 'warning';
                          text = 'Hết hạn';
                          break;
                        case 3:
                          color = 'error';
                          text = 'Hủy';
                          break;
                        default:
                          color = 'default';
                          text = 'Chưa đến';
                      }

                      return <Chip size="small" label={text} color={color} variant="outlined" />;
                    })()}
                  </TableCell>
                  <TableCell className="table-cell">
                    <Tooltip title="Hủy">
                      <IconButton color="error" onClick={() => handleDelete(record.id)} disabled={record.trangThai === 3}>
                        <SyncIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton color="primary" onClick={() => handleNavigate('sua', record.id)} sx={{ marginLeft: 1 }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chi tiết phiếu giảm giá">
                      <IconButton color="default" onClick={() => handleOpenModal(record)}>
                        <MoreHorizIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="space-between" alignItems="center" m={2}>
            <Pagination count={Math.ceil(totalItems / size)} page={currentPage} onChange={handlePageChange} />
            <Select value={size} onChange={handleSizeChange} displayEmpty>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Box>
        </TableContainer>
      </Box>
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth={800}>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Đóng
          </Button>
        </DialogActions>
        <DialogContent>{selectedCoupon && <CouponsCustomer id={selectedCoupon.id} />}</DialogContent>
      </Dialog>
    </>
  );
}

export default PGGTable;
