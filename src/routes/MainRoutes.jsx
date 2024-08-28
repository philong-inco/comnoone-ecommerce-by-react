import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import  from '../error/.jsx';
import { element } from 'prop-types';



// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ComNo1PageDemo = Loadable(lazy(() => import('views/utilities/ComNo1PageDemo.jsx')));
// Phiếu giảm giá
const DanhSachPhieuGiamGia = Loadable(lazy(() => import('views/pages/phieugiamgia/DanhSach.jsx')));


// Sản phẩm
const DanhSachSanPham = Loadable(lazy(() => import('views/pages/sanpham/DanhSachSanPham.jsx')));
const ThemSanPham = Loadable(lazy(() => import('views/pages/sanpham/ThemSanPham.jsx')));
const SuaSanPham = Loadable(lazy(() => import('views/pages/sanpham/SuaSanPham.jsx')));
// thuộc tính
const DanhSachRam = Loadable(lazy(() => import('views/pages/sanpham/ram/DanhSachRam.jsx')));
const DanhSachBanPhim = Loadable(lazy(() => import('views/pages/sanpham/banphim/DanhSachBanPhim.jsx')));
const DanhSachManHinh = Loadable(lazy(() => import('views/pages/sanpham/manhinh/DanhSachManHinh.jsx')));
const DanhSachCpu = Loadable(lazy(() => import('views/pages/sanpham/cpu/DanhSachCpu.jsx')));
const DanhSachVga = Loadable(lazy(() => import('views/pages/sanpham/vga/DanhSachVga.jsx')));
const DanhSachHeDieuHanh = Loadable(lazy(() => import('views/pages/sanpham/hedieuhanh/DanhSachHeDieuHanh.jsx')));
const DanhSachOCung = Loadable(lazy(() => import('views/pages/sanpham/ocung/DanhSachOCung.jsx')));
const DanhSachMauSac = Loadable(lazy(() => import('views/pages/sanpham/mausac/DanhSachMauSac.jsx')));
const DanhSachWebcam = Loadable(lazy(() => import('views/pages/sanpham/webcam/DanhSachWebcam.jsx')));

// ==============================|| MAIN ROUTING ||============================== //

// ==============================||  NHÂN VIÊN ||============================== //
const DanhSachNhanVien = Loadable(lazy(() => import('views/pages/nhanvien/NhanVien.jsx')));
const NhanVienConfiguration = Loadable(lazy(() => import('views/pages/nhanvien/NhanVienConfiguration.jsx')));
// ==============================||  KHÁCH HÀNG ||============================== //
const KhachHang = Loadable(lazy(() => import('views/pages/khachhang/KhachHang.jsx')));
const KhachHangConfiguration = Loadable(lazy(() => import('views/pages/khachhang/KhachHangConfiguration.jsx')));
const KhachHangAddress = Loadable(lazy(() => import('views/pages/khachhang/KhachHangAddress.jsx')))

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // Hóa đơn
    {
      path: 'hoadon',
      children: [
        {
          path: 'banhangtaiquay',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'choxacnhan',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'danhsach',
          element: <><ComNo1PageDemo /></>
        },

        // Thêm các route add update detail ở đây
      ]
    },

    // Sản phẩm
    {
        path: 'sanpham',
        children: [
          {
            path: 'danhsach',
            element: <><DanhSachSanPham/></>
          },
          {
            path: 'them',
            element: <ThemSanPham/>
          },
          {
            path: 'sua',
            element: <><SuaSanPham/></>
          },
          {
            path: 'ram',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachRam/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'vga',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachVga/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'cpu',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachCpu/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'manhinh',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachManHinh/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'banphim',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachBanPhim/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'ocung',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachOCung/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'hedieuhanh',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachHeDieuHanh/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'webcam',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachWebcam/></>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'mausac',
            children: [
              {
                path: 'danhsach',
                element: <><DanhSachMauSac/></>
              }// Thêm các route add update detail ở đây
            ]
          }
        ]
    },

    // Đợt giảm giá
    {
      path: 'dotgiamgia',
      children: [
        {
          path: 'danhsach',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'them',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'sua',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'xoa',
          element: <><ComNo1PageDemo /></>
        }
      ]
    },



    //Phiếu giảm giá
    {
      path: 'phieugiamgia',
      children: [
        {
          path: 'danhsach',
          element: <><DanhSachPhieuGiamGia /></>
        },
        {
          path: 'them',
          element: <><DanhSachPhieuGiamGia /></>
        },
        {
          path: 'sua',
          element: <><DanhSachPhieuGiamGia /></>
        },
        {
          path: 'xoa',
          element: <><DanhSachPhieuGiamGia /></>
        }
      ]
    },


    // Nhân viên
    {
      path: 'nhanvien',
      children: [
        {
          path: 'danhsachnhanvien',
          element: <DanhSachNhanVien />
        },
        {
          path: 'configuration',
          element: <NhanVienConfiguration />
        },
        {
          path: 'configuration/:id',
          element: <NhanVienConfiguration />
        },

      ]
    },

    // Khách hàng
    {
      path: 'khachhang',
      children: [
        {
          path: 'danhsachkhachhang',
          element: <KhachHang/>
        },
        {
          path: 'khachhangconfiguration',
          element: <KhachHangConfiguration/>
        },
        {
          path: 'khachhangaddress/:id',
          element: <KhachHangAddress/>
        },
      ]
    },

    // Vai trò
    {
      path: 'vaitro',
      children: [
        {
          path: 'danhsach',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'them',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'sua',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'xoa',
          element: <><ComNo1PageDemo /></>
        }
      ]
    },

    // Thống kê
    {
      path: 'thongke',
      children: [
        {
          path: 'sanpham',
          element: <><ComNo1PageDemo /></>
        },
        {
          path: 'doanhthu',
          element: <><ComNo1PageDemo /></>
        }
      ]
    },



    // Default của giao diện cứ để lại đây sau làm thống kê
    {
      path: '/',
      element: <><DashboardDefault /></>
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <><DashboardDefault /></>
        }
      ]
    },
    {
      path: 'chinhsach',
      element: <><ComNo1PageDemo /></>
    }
  ]
};

export default MainRoutes;
