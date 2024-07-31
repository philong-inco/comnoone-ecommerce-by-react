import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll } from 'services/admin/customer/customerService.js';
import { IconEdit } from '@tabler/icons-react';

import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    Avatar,
    Chip
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { current } from '@reduxjs/toolkit';


const KhachHang = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [khachhang, setKhachHang] = useState('')
    const statuses = [
        { id: '', name: 'Tất Cả' },
        { id: '0', name: 'Dừng Hoạt Động' },
        { id: '1', name: 'Hoạt Động' }
    ];
    const navigate = useNavigate();

    const fetchKhachHang = async () => {
        try {
            let result;
            result = await getAll(currentPage);
            setKhachHang(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchKhachHang();
    }, [currentPage]);

    const getStatusChip = (status) => {
        switch (status) {
            case 0:
                return (
                    <Chip
                        label="Dừng Hoạt Động"
                        color="default"
                        style={{ backgroundColor: '#f44336', color: '#fff' }}
                    />
                );
            case 1:
                return (
                    <Chip
                        label="Hoạt Động"
                        color="success"
                        style={{ backgroundColor: '#4caf50', color: '#fff' }}
                    />
                );
            default:
                return (
                    <Chip
                        label="Không xác định"
                        color="warning"
                        style={{ backgroundColor: '#ff9800', color: '#fff' }}
                    />
                );
        }
    };
    const getGioiTinhKhachHang = (sex) => {
        switch (sex) {
            case 0:
                return 'Nữ';
            case 1:
                return 'Nam';
            default:
                return 'Không xác định';
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const handleEdit = (id) => {
        navigate(`/khachhang/khachhangaddress/${id}`);
    };

    const handlePageChange = (value) => {
        setCurrentPage(value - 1);
    }

    const handleNavigate = () => {
        navigate('/khachhang/khachhangconfiguration');
    }

    return (
        <MainCard style={{ textAlign: "center" }} title="Danh Sách Khách Hàng">
            <Button variant="contained" style={{ marginLeft: "85%", marginBottom: "10px" }} color="secondary" onClick={handleNavigate}>
                + Thêm Khách Hàng
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Hình Ảnh</TableCell>
                            <TableCell align="center">Mã Khách Hàng</TableCell>
                            <TableCell align="center">Tên Khách Hàng</TableCell>
                            
                            <TableCell align="center">Ngày Sinh</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Số Điện Thoại</TableCell>
                            
                            <TableCell align="center">Giới Tính</TableCell>
                            {/* <TableCell align="center">Trạng Thái</TableCell> */}
                            <TableCell align="center">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            khachhang.length > 0 && khachhang.map((kh, index) => {
                                const ngaySinh = formatDate(kh.ngaySinh);
                                return (
                                    <TableRow>
                                        <TableCell align="center">{index + 1 + currentPage * 10}</TableCell>
                                        <TableCell align="center">
                                            <Avatar
                                                alt={kh.ten}
                                                src={kh.hinhAnh}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{kh.ma}</TableCell>
                                        <TableCell align="center">{kh.ten}</TableCell>
                                        
                                        <TableCell align="center">{ngaySinh}</TableCell>
                                        <TableCell align="center">{kh.email}</TableCell>
                                        <TableCell align="center">{kh.sdt}</TableCell>
                                        
                                        <TableCell align="center">{getGioiTinhKhachHang(kh.gioiTinh)}</TableCell>
                                        {/* <TableCell align="center">{getStatusChip(kh.trangThai)}</TableCell> */}
                                        <TableCell align="center">
                                            <Button className="btn btn-link">
                                                <IconEdit stroke={2} onClick={() => handleEdit(kh.id)} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={currentPage + 1}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </MainCard>
    )
}

export default KhachHang