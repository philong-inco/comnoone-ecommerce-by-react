import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ErrorBoundary from '../error/ErrorBoundary.jsx';
import { element } from 'prop-types';
import PGGTable from 'views/pages/coupons/index.jsx';
import CreateCoupons from 'views/pages/coupons/CreateCoupons.jsx';
import UpdateCoupons from 'views/pages/coupons/UpdateCoupons.jsx';

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
// ==============================|| MAIN ROUTING ||============================== //

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
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'choxacnhan',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'danhsach',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        }

        // Thêm các route add update detail ở đây
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
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'ram',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <ComNo1PageDemo />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
          ]
        },
        {
          path: 'vga',
          children: [
            {
              path: 'danhsach',
              element: (
                <ErrorBoundary>
                  <ComNo1PageDemo />
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
                  <ComNo1PageDemo />
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
                  <ComNo1PageDemo />
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
                <ErrorBoundary>
                  <ComNo1PageDemo />
                </ErrorBoundary>
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
                  <ComNo1PageDemo />
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
                  <ComNo1PageDemo />
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
                  <ComNo1PageDemo />
                </ErrorBoundary>
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
                  <ComNo1PageDemo />
                </ErrorBoundary>
              )
            } // Thêm các route add update detail ở đây
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
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'them',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'sua',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'xoa',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        }
      ]
    },

    //Phiếu giảm giá
    {
      path: 'phieugiamgia',
      children: [
        {
          path: 'danhsach',
          element: (
            <ErrorBoundary>
              <PGGTable />
            </ErrorBoundary>
          )
        },
        {
          path: 'them',
          element: <CreateCoupons />
        },
        {
          path: 'sua/:id',
          element: <UpdateCoupons />
        },
        {
          path: 'xoa',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        }
      ]
    },

    // Nhân viên
    {
      path: 'nhanvien',
      children: [
        {
          path: 'danhsach',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'them',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'sua',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'xoa',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        }
      ]
    },

    // Khách hàng
    {
      path: 'khachhang',
      children: [
        {
          path: 'danhsach',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'them',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'sua',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'xoa',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        }
      ]
    },

    // Vai trò
    {
      path: 'vaitro',
      children: [
        {
          path: 'danhsach',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'them',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'sua',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'xoa',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        }
      ]
    },

    // Thống kê
    {
      path: 'thongke',
      children: [
        {
          path: 'sanpham',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        },
        {
          path: 'doanhthu',
          element: (
            <ErrorBoundary>
              <ComNo1PageDemo />
            </ErrorBoundary>
          )
        }
      ]
    },

    // Default của giao diện cứ để lại đây sau làm thống kê
    {
      path: '/',
      element: (
        <ErrorBoundary>
          <DashboardDefault />
        </ErrorBoundary>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <ErrorBoundary>
              <DashboardDefault />
            </ErrorBoundary>
          )
        }
      ]
    },
    {
      path: 'chinhsach',
      element: (
        <ErrorBoundary>
          <ComNo1PageDemo />
        </ErrorBoundary>
      )
    }
  ]
};

export default MainRoutes;
