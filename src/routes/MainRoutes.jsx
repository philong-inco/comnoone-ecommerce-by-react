import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ErrorBoundary from '../error/ErrorBoundary.jsx';
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
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'choxacnhan',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'danhsach',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },

        // Thêm các route add update detail ở đây
      ]
    },

    // Sản phẩm
    {
<<<<<<< HEAD
        path: 'sanpham',
        children: [
          {
            path: 'danhsach',
            element: <ErrorBoundary><DanhSachSanPham/></ErrorBoundary>
          },
          {
            path: 'them',
            element: <ThemSanPham/>
          },
          {
            path: 'sua',
            element: <ErrorBoundary><SuaSanPham/></ErrorBoundary>
          },
          {
            path: 'ram',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachRam/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'vga',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachVga/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'cpu',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachCpu/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'manhinh',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachManHinh/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'banphim',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachBanPhim/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'ocung',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachOCung/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'hedieuhanh',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachHeDieuHanh/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'webcam',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachWebcam/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          },
          {
            path: 'mausac',
            children: [
              {
                path: 'danhsach',
                element: <ErrorBoundary><DanhSachMauSac/></ErrorBoundary>
              }// Thêm các route add update detail ở đây
            ]
          }
        ]
=======
      path: 'sanpham',
      children: [
        {
          path: 'danhsach',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'ram',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'vga',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'cpu',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'manhinh',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'banphim',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'ocung',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'hedieuhanh',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'webcam',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'mausac',
          children: [
            {
              path: 'danhsach',
              element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
            }// Thêm các route add update detail ở đây
          ]
        }
      ]
>>>>>>> eeda74bd8c26378600ee776d0acb7b5a619c867c
    },

    // Đợt giảm giá
    {
      path: 'dotgiamgia',
      children: [
        {
          path: 'danhsach',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'them',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'sua',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'xoa',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        }
      ]
    },



    //Phiếu giảm giá
    {
      path: 'phieugiamgia',
      children: [
        {
          path: 'danhsach',
          element: <ErrorBoundary><DanhSachPhieuGiamGia /></ErrorBoundary>
        },
        {
          path: 'them',
          element: <ErrorBoundary><DanhSachPhieuGiamGia /></ErrorBoundary>
        },
        {
          path: 'sua',
          element: <ErrorBoundary><DanhSachPhieuGiamGia /></ErrorBoundary>
        },
        {
          path: 'xoa',
          element: <ErrorBoundary><DanhSachPhieuGiamGia /></ErrorBoundary>
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
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'them',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'sua',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'xoa',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        }
      ]
    },

    // Thống kê
    {
      path: 'thongke',
      children: [
        {
          path: 'sanpham',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        },
        {
          path: 'doanhthu',
          element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
        }
      ]
    },



    // Default của giao diện cứ để lại đây sau làm thống kê
    {
      path: '/',
      element: <ErrorBoundary><DashboardDefault /></ErrorBoundary>
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <ErrorBoundary><DashboardDefault /></ErrorBoundary>
        }
      ]
    },
    {
      path: 'chinhsach',
      element: <ErrorBoundary><ComNo1PageDemo /></ErrorBoundary>
    }
  ]
};

export default MainRoutes;
