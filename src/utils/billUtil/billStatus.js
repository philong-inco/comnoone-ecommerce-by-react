import { red, blue, orange, green, purple, cyan, grey } from '@mui/material/colors';

export const getStatusDisplayName = (status) => {
  switch (status) {
    case 'DON_MOI':
      return 'Đơn Mới';
    case 'CHO_THANH_TOAN':
      return 'Chờ thanh toán';
    case 'CHO_XAC_NHAN':
      return 'Chờ xác nhận';
    case 'CHO_GIAO':
      return 'Chờ giao hàng';
    case 'DANG_GIAO':
      return 'Đang giao vận chuyển';
    case 'TRA_HANG_HOAN_TIEN':
      return 'Trả hàng hoàn tiền';
    case 'HOAN_THANH':
      return 'Hoàn thành';
    case 'HUY':
      return 'Hủy';
    case 'XOA':
      return 'Xoá';
    case 'XAC_NHAN':
      return 'Đã xác nhận';
    case 'TREO':
      return 'Hóa đơn chờ';
    case 'HEN_LAI':
      return 'Hẹn lại';
    default:
      return 'Không xác định';
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'DON_MOI':
      return '#5F35B2';
    case 'CHO_THANH_TOAN':
      return orange[500];
    case 'CHO_THANH_TOAN':
      return orange[500];
    case 'CHO_XAC_NHAN':
      return orange[300];
    case 'CHO_GIAO':
      return purple[500];
    case 'DANG_GIAO':
      return cyan[500];
    case 'TRA_HANG_HOAN_TIEN':
      return purple[200];
    case 'HOAN_THANH':
      return green[500];
    case 'HUY':
      return red[500];
    case 'XOA':
      return grey[500];
    case 'XAC_NHAN':
      return blue[500];
    case 'TREO':
      return orange[500];
    default:
      return grey[400];
  }
};

export const getStatusBillHistoryColor = (status) => {
  switch (status) {
    case 0:
      return '#5F35B2';
    case 1:
      return orange[500];
    case 2:
      return orange[300];
    case 3:
      return purple[500];
    case 4:
      return cyan[500];
    case 5:
      return purple[200];
    case 6:
      return green[500];
    case 7:
      return red[500];
    case 8:
      return grey[500];
    case 9:
      return grey[500];
    case 12:
      return orange[500];

    default:
      return grey[400];
  }
};

export const getStatusBillHistory = (status) => {
  switch (status) {
    case 0:
      return 'Tạo đơn hàng';
    case 1:
      return 'Chờ thanh toán';
    case 2:
      return 'Chờ xác nhận';
    case 3:
      return 'Chờ  vận chuyển';
    case 4:
      return 'Đang giao';
    case 5:
      return 'Trả hàng hoàn tiền';
    case 6:
      return 'Hoàn thành';
    case 7:
      return 'Hủy';
    case 8:
      return 'Xoá';
    case 9:
      return 'Đã xác nhận';
    case 12:
      return 'Cập nhập đơn hàng';
    case 13:
      return 'Hẹn lại';
    default:
      return 'Không xác định';
  }
};
