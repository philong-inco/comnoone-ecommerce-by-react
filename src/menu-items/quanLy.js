import { IconReceipt2 } from '@tabler/icons-react';

const icons = { IconReceipt2 };

const quanLy = {
  id: 'quanly',
  title: 'Quản lý',
  type: 'group',
  children: [
    {
      id: 'hoadon',
      title: 'Quản lý hóa đơn',
      type: 'collapse',
      icon: icons.IconReceipt2,
      children: [
        {
          id: 'index',
          title: 'Danh sách',
          type: 'item',
          url: '/hoa-don/danh-sach'
        },
        {
          id: 'hoadoncho',
          title: 'Chờ xác nhận',
          type: 'item',
          url: '/hoadon/choxacnhan'
        },
        {
          id: 'danhsachhoadon',
          title: 'Danh sách hóa đơn',
          type: 'item',
          url: '/hoadon/danhsach'
        }
      ]
    },
    {
      id: 'sanpham',
      title: 'Quản lý sản phẩm',
      type: 'collapse',
      icon: icons.IconReceipt2,
      children: [
        {
          id: 'sanpham',
          title: 'Sản phẩm',
          type: 'item',
          url: '/sanpham/danhsach'
        },
        {
          id: 'ram',
          title: 'Ram',
          type: 'item',
          url: '/sanpham/ram/danhsach'
        },
        {
          id: 'vga',
          title: 'Vga',
          type: 'item',
          url: '/sanpham/vga/danhsach'
        },
        {
          id: 'cpu',
          title: 'CPU / Chip',
          type: 'item',
          url: '/sanpham/cpu/danhsach'
        },
        {
          id: 'manhinh',
          title: 'Màn hình',
          type: 'item',
          url: '/sanpham/manhinh/danhsach'
        },
        {
          id: 'banphim',
          title: 'Bàn phím',
          type: 'item',
          url: '/sanpham/banphim/danhsach'
        },
        {
          id: 'ocung',
          title: 'Ổ cứng',
          type: 'item',
          url: '/sanpham/ocung/danhsach'
        },
        {
          id: 'webcam',
          title: 'Webcam',
          type: 'item',
          url: '/sanpham/webcam/danhsach'
        },
        {
          id: 'hedieuhanh',
          title: 'Hệ điều hành',
          type: 'item',
          url: '/sanpham/hedieuhanh/danhsach'
        },
        {
          id: 'mausac',
          title: 'Màu sắc',
          type: 'item',
          url: '/sanpham/mausac/danhsach'
        }
      ]
    },
    {
      id: 'khuyenmai',
      title: 'Giảm giá',
      type: 'collapse',
      icon: icons.IconReceipt2,
      children: [
        {
          id: 'phieugiamgia',
          title: 'Phiếu giảm giá',
          type: 'item',
          url: '/phieugiamgia/danhsachphieugiamgia'
        },
        {
          id: 'cauhinhphieugiamgia',
          title: 'Cấu hình phiếu giảm giá',
          type: 'item',
          url: '/phieugiamgia/cauhinhphieugiamgia'
        },
      ]
    },
    {
      id: 'taikhoan',
      title: 'Tài khoản',
      type: 'collapse',
      icon: icons.IconReceipt2,
      children: [
        {
          id: 'nhanvien',
          title: 'Nhân viên',
          type: 'item',
          url: '/nhanvien/danhsachnhanvien'
        },
        {
          id: 'khachhang',
          title: 'Khách hàng',
          type: 'item',
          url: '/khachhang/danhsachkhachhang'
        }
      ]
    },
    {
      id: 'lichlamviec',
      title: 'Lịch Làm Việc',
      type: 'collapse',
      icon: icons.IconReceipt2,
      children: [
        {
          id: 'hienthilich',
          title: 'Thông tin lịch làm việc ',
          type: 'item',
          url: '/lichlamviec/hienthilich'
        }
      ]
    }
  ]
};

export default quanLy;
