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
  Chip,
  Select,
  MenuItem
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, MoreHoriz as MoreHorizIcon, Sync as SyncIcon } from '@mui/icons-material';
import { deletedCoupons, filterCoupons } from 'services/admin/coupons/couponsService';
import './index.css';
import CouponsCustomer from './CouponsCustomer';
import FilterCoupons from './FilterCoupons';

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
  const [filter, setFilter] = useState({
    ma: '',
    phamViApDung: '',
    trangThai: '',
    fromDate: null,
    toDate: null
  });

  const fetchApi = async (page = currentPage, size = size) => {
    setLoading(true);
    try {
      let filterString = `(ma ~~ '${filter.ma}')`;
      if (filter.phamViApDung) {
        filterString += ` and phamViApDung = ${filter.phamViApDung}`;
      }
      if (filter.trangThai) {
        filterString += ` and trangThai = ${filter.trangThai}`;
      }
      if (filter.fromDate && filter.toDate) {
        filterString += ` and ngayTao >= '${filter.fromDate.toISOString()}' and ngayTao <= '${filter.toDate.toISOString()}'`;
      }

      const response = await filterCoupons(page, size, filterString);
      if (response.status_code === 200) {
        setListPhieuGiamGia(response.data.result);
        setCurrentPage(response.data.meta.page + 1);
        setSize(response.data.meta.pageSize);
        setTotalItems(response.data.meta.total);
      } else {
        alert('Failed to fetch data from API');
      }
    } catch (error) {
      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi(currentPage, size);
  }, [currentPage, size, filter]);

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
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

  return (
    <>
      <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 5 }}>
        <Link to="/phieugiamgia/them" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>
            Add
          </Button>
        </Link>
      </Box>

      <FilterCoupons filter={filter} onFilterChange={handleFilterChange} />

      <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 5 }}>
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
                  <TableCell className="table-cell-small">{record.soLuong ? record.soLuong : 'Không giới hạn'}</TableCell>
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
                    {new Date(record.ngayBatDau).toLocaleDateString('vi-VN')} | {new Date(record.ngayHetHan).toLocaleDateString('vi-VN')}
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
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Select size="small" value={size} onChange={handleSizeChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          <Pagination
            sx={{ marginTop: 2 }}
            count={Math.ceil(totalItems / size)}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            size="small"
          />
        </Box>

        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="lg" fullWidth>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Đóng
            </Button>
          </DialogActions>
          <DialogContent>{selectedCoupon && <CouponsCustomer id={selectedCoupon.id} />}</DialogContent>
        </Dialog>
      </Box>
    </>
  );
}

export default PGGTable;
