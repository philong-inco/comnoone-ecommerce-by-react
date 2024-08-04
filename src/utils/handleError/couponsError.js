export const handleCouponErrors = (errorResponse, setErrors) => {
  console.log(errorResponse);

  if (errorResponse && errorResponse.message) {
    const newErrors = {};
    if (errorResponse && errorResponse.message && Array.isArray(errorResponse.message)) {
      errorResponse.message.forEach((error) => {
        const fieldName = error.field;
        const errorMessage = error.messages;
        switch (fieldName) {
          case 'ten':
            newErrors.ten = errorMessage;
            break;
          case 'ngayBatDau':
            newErrors.ngayBatDau = errorMessage;
            break;
          case 'ngayHetHan':
            newErrors.ngayHetHan = errorMessage;
            break;
          case 'loaiGiamGia':
            newErrors.loaiGiamGia = errorMessage;
            break;
          case 'giaTriGiamGia':
            newErrors.giaTriGiamGia = errorMessage;
            break;
          case 'giaTriDonToiThieu':
            newErrors.giaTriDonToiThieu = errorMessage;
            break;
          case 'giamToiDa':
            newErrors.giamToiDa = errorMessage;
            break;
          case 'phamViApDung':
            newErrors.phamViApDung = errorMessage;
            break;
          case 'soLuong':
            newErrors.soLuong = errorMessage;
            break;
          default:
            console.log('Lỗi chưa bắt được AppExceptionError: \n', error);
            break;
        }
      });
    }
    if (errorResponse.status_code !== 400) {
      const errorCode = errorResponse.status_code;
      const errorMessage = errorResponse.message;

      switch (errorCode) {
        case 2000:
          newErrors.ngayHetHan = errorMessage;
          break;
        case 2001:
          newErrors.ngayHetHan = errorMessage;
          break;
        case 3001:
          newErrors.giaTriGiamGia = errorMessage;
          break;
        case 3012:
          newErrors.ma = errorMessage;
          break;
        default:
          console.log('Lỗi chưa bắt được AppException \n', errorResponse.message);
          break;
      }
    }
    setErrors(newErrors);
  }
};
