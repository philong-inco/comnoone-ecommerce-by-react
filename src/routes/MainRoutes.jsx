import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ErrorBoundary from '../error/ErrorBoundary.jsx';
import { element } from 'prop-types';

import ChinhSach from 'views/utilities/ChinhSach.jsx';

import AuthGuard from './AuthGuard.jsx';
import ForbiddenPage from 'views/pages/403/ForbiddenPage.jsx';

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
const DanhSachPhieuGiamGia = Loadable(lazy(() => import('views/pages/phieugiamgia/PhieuGiamGia.jsx')));
const PhieuGiamGiaConfiguration = Loadable(lazy(() => import('views/pages/phieugiamgia/PhieuGiamGiaConfiguration.jsx')));

// Sản phẩm
const DanhSachSanPham = Loadable(lazy(() => import('views/pages/sanpham/DanhSachSanPham.jsx')));
const ThemSanPham = Loadable(lazy(() => import('views/pages/sanpham/ThemSanPham.jsx')));
const SuaSanPham = Loadable(lazy(() => import('views/pages/sanpham/SuaSanPham.jsx')));
const ImportSanPham = Loadable(lazy(() => import('views/pages/sanpham/importSanPham/ImportSanPham')));

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
const DanhSachNhuCau = Loadable(lazy(() => import('views/pages/sanpham/nhucau/DanhSachNhuCau.jsx')));
const DanhSachThuongHieu = Loadable(lazy(() => import('views/pages/sanpham/thuonghieu/DanhSachThuongHieu.jsx')));

// ==============================||  NHÂN VIÊN ||============================== //
const DanhSachNhanVien = Loadable(lazy(() => import('views/pages/nhanvien/NhanVien.jsx')));
const NhanVienConfiguration = Loadable(lazy(() => import('views/pages/nhanvien/NhanVienConfiguration.jsx')));
// ==============================||  KHÁCH HÀNG ||============================== //
const KhachHang = Loadable(lazy(() => import('views/pages/khachhang/KhachHang.jsx')));
const KhachHangConfiguration = Loadable(lazy(() => import('views/pages/khachhang/KhachHangConfiguration.jsx')));
const KhachHangAddress = Loadable(lazy(() => import('views/pages/khachhang/KhachHangAddress.jsx')));
// ==============================|| CALENDA WORK ||============================== //
const CalendarWork = Loadable(lazy(() => import('views/pages/calendarwork/Calendarwork.jsx')));
// ==============================|| ĐỢT GIẢM GIÁ ||============================== //
const DanhSachDotGiamGia = Loadable(lazy(() => import('views/pages/dotgiamgia/DotGiamGia.jsx')));
const DotGiamGiaConfiguration = Loadable(lazy(() => import('views/pages/dotgiamgia/DotGiamGiaConfiguation.jsx')));
// hóa đơn
const Bill = Loadable(lazy(() => import('views/pages/bill/index.jsx')));
const BillDetail = Loadable(lazy(() => import('views/pages/bill-detail/BillDetail.jsx')));
const BillDetail2 = Loadable(lazy(() => import('views/pages/billDetail/BillDetail.jsx')));
// Bán hàng
const Sell = Loadable(lazy(() => import('views/pages/ban-hang/index.jsx')));
//Chính sách 
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'hoa-don',
      children: [
        {
          path: 'danh-sach',
          element: (
            <AuthGuard allowedRoles={['ADMIN']}>
              <Bill />{' '}
            </AuthGuard>
          )
        },

        {
          path: 'chi-tiet/:id',
          element: (
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <BillDetail2 />{' '}
            </AuthGuard>
          )
        }

        // Thêm các route add update detail ở đây
      ]
    },
    {
      path: '/403',
      children: [
        {
          path: '',
          element: <ForbiddenPage></ForbiddenPage>
        }
      ]
    },
    // Bán hàng tại quầy
    {
      path: 'ban-hang',
      children: [
        {
          path: '',
          element: (
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <Sell />
            </AuthGuard>
          )
        },
        {
          path: 'hoa-don/:id',
          element: (
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <Sell />
            </AuthGuard>
          )
        }
      ]
    },
    // Sản phẩm
    {
      path: 'sanpham',
      children: [
        {
          path: 'danhsach',
          element: (
            <ErrorBoundary>
              <DanhSachSanPham />
            </ErrorBoundary>
          )
        },
        {
          path: 'them',
          element: <ThemSanPham />
        },
        {
          path: 'sua/:id',
          element: <SuaSanPham />
        },
        {
          path: 'themnhieusanpham',
          element: (
            <>
              <ImportSanPham />
            </>
          )
        },
        {
          path: 'ram',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachRam />
                </ErrorBoundary>
              )
            }
          ]
        },
        {
          path: 'vga',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachVga />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'cpu',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachCpu />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'manhinh',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachManHinh />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'banphim',
          children: [
            {
              path: 'danhsach',
              element: (
                <DanhSachBanPhim />
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'ocung',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachOCung />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'hedieuhanh',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachHeDieuHanh />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'webcam',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachWebcam />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'nhucau',
          children: [
            {
              path: 'danhsach',
              element: (
                <>
                  <DanhSachNhuCau />
                </>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'thuonghieu',
          children: [
            {
              path: 'danhsach',
              element: (
                <>
                  <DanhSachThuongHieu />
                </>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'mausac',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <DanhSachMauSac />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        }
      ]
    },
    {
      path: 'phieugiamgia',
      children: [
        {
          path: 'danhsachphieugiamgia',
          element:
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <DanhSachPhieuGiamGia />
            </AuthGuard>
        },
        {
          path: 'cauhinhphieugiamgia',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <PhieuGiamGiaConfiguration />
            </AuthGuard>
        },
        {
          path: 'cauhinhphieugiamgia/:id',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <PhieuGiamGiaConfiguration />
            </AuthGuard>
        },
        {
          path: 'chitietphieugiamgia/:id',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <PhieuGiamGiaConfiguration />
            </AuthGuard>
        }
      ]
    },
    {
      path: 'dotgiamgia',
      children: [
        {
          path: 'danhsachdotgiamgia',
          element:
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <DanhSachDotGiamGia />
            </AuthGuard>

        },
        {
          path: 'cauhinhdotgiamgia',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <DotGiamGiaConfiguration />
            </AuthGuard>
        },
        {
          path: 'cauhinhdotgiamgia/edit/:id',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <DotGiamGiaConfiguration />
            </AuthGuard>
        },
        {
          path: 'cauhinhdotgiamgia/view/:id',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <DotGiamGiaConfiguration />
            </AuthGuard>
        }
      ]
    },
    {
      path: 'nhanvien',
      children: [
        {
          path: 'danhsachnhanvien',
          element: (
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <DanhSachNhanVien />
            </AuthGuard>
          )
        },
        {
          path: 'configuration',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <NhanVienConfiguration />
            </AuthGuard>
        },
        {
          path: 'configuration/:id',
          element:
            <AuthGuard allowedRoles={['ADMIN']}>
              <NhanVienConfiguration />
            </AuthGuard>
        }
      ]
    },

    {
      path: 'khachhang',
      children: [
        {
          path: 'danhsachkhachhang',
          element:
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <KhachHang />
            </AuthGuard>
        },
        {
          path: 'khachhangconfiguration',
          element:
            <AuthGuard allowedRoles={['ADMIN', "STAFF"]}>
              <KhachHangConfiguration />
            </AuthGuard>
        },
        {
          path: 'khachhangaddress/:id',
          element:
            <AuthGuard allowedRoles={['ADMIN', 'STAFF']}>
              <KhachHangAddress />
            </AuthGuard>
        }
      ]
    },

    // {
    //   path: 'lichlamviec',
    //   children: [
    //     {
    //       path: 'hienthilich',
    //       element: <CalendarWork />
    //     }
    //   ]
    // },
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'chinhsach',
      element: (
        <ErrorBoundary>
          <ChinhSach />
        </ErrorBoundary>
      )
    }
  ]
};

export default MainRoutes;
