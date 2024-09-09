import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDanhSachPhieu } from 'services/admin/phieugiamgia/phieugiamgiaapi';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';

function PhieuGiamGia() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [danhSachPhieuGiamGia, setDanhSachPhieuGiamGia] = useState([]);
  const statuses = [
    { id: '', name: 'Đang diễn ra' },
    { id: '0', name: 'Đã hết thời gian' },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDanhSachPhieu();
  }, [currentPage]);


  const fetchAllDanhSachPhieu = async () => {
    try {
      const result = await getAllDanhSachPhieu(currentPage - 1);
      setDanhSachPhieuGiamGia(result.content); 
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


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
                  <TableCell>{phieu.maPhieu}</TableCell>
                  <TableCell>{phieu.tenPhieu}</TableCell>
                  <TableCell>{statuses.find(status => status.id === phieu.trangThai)?.name}</TableCell>
                  <TableCell>{phieu.ngayBatDau}</TableCell>
                  <TableCell>{phieu.ngayKetThuc}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/phieu/${phieu.id}`)}>
                      Xem chi tiết
                    </Button>
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
