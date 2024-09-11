import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDanhSachPhieu } from 'services/admin/phieugiamgia/phieugiamgiaapi';
import { IconButton, Tooltip, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
function PhieuGiamGia() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [danhSachPhieuGiamGia, setDanhSachPhieuGiamGia] = useState([]);
  const statuses = [
    { id: 0, name: 'Chưa áp dụng', color: 'gray' },
    { id: 1, name: 'Đang áp dụng', color: 'green' },
    { id: 2, name: 'Đã hết hạn', color: 'red' },
    { id: 3, name: 'Đã hủy', color: 'orange' }
  ];
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllDanhSachPhieu();
  }, [currentPage]);
  const fetchAllDanhSachPhieu = async () => {
    try {
      debugger;
      const list = await getAllDanhSachPhieu(currentPage - 1);
      setDanhSachPhieuGiamGia(list.data.result);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getStatusName = (statusId) => {
    debugger;
    const status = statuses.find((s) => s.id === statusId);
    return status ? status.name : 'Không xác định';
  };
  const getStatusColor = (statusId) => {
    const status = statuses.find((s) => s.id === statusId);
    return status ? status.color : 'gray';
  };
  const handleNavigate = () => {
    navigate('/phieugiamgia/cauhinhphieugiamgia');
  };
  const handleEdit = (id) => {
    navigate(`/phieugiamgia/cauhinhphieugiamgia/${id}`);
  };
  const handleViewCoupon = (id) => {
    navigate(`/phieugiamgia/chitietphieugiamgia/${id}`);
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã phiếu</TableCell>
              <TableCell>Tên phiếu</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ngày kết thúc</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {danhSachPhieuGiamGia.length > 0 ? (
              danhSachPhieuGiamGia.map((phieu, index) => (
                <TableRow key={index}>
                  <TableCell>{phieu.ma}</TableCell>
                  <TableCell>{phieu.ten}</TableCell>
                  <TableCell>{phieu.ngayBatDau}</TableCell>
                  <TableCell>{phieu.ngayHetHan}</TableCell>
                  <TableCell>  <Box
                    sx={{
                      backgroundColor: getStatusColor(phieu.trangThai),
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      display: 'inline-block',
                      width: '120px',
                      fontWeight: 'bold'
                    }}
                  >
                    {getStatusName(phieu.trangThai)}
                  </Box>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewCoupon(phieu.id)}
                    >
                      <Tooltip title="Xem chi tiết">
                        <VisibilityIcon />
                      </Tooltip>
                    </IconButton>
                    {phieu.trangThai === 0 && (
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(phieu.id)}
                      >
                        <Tooltip title="Edit Phiếu Giảm Giá">
                          <EditIcon />
                        </Tooltip>
                      </IconButton>
                    )}             
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">Không có phiếu giảm giá nào</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
}

export default PhieuGiamGia;
