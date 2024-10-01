import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import { getBillByCode } from 'services/admin/bill/billService';
function PdfForm(props) {
  const { serials, code, hiden } = props;
  const [bill, setBill] = useState({});
  console.log('Data : ', serials);
  console.log('Data2 : ', code);
  useEffect(() => {
    fetchBillInFo(code);
  }, [code]);
  const fetchBillInFo = async (code) => {
    const response = await getBillByCode(code);
    if (response.status_code === 200) {
      console.log('Data 4 : ', response.data);
      setBill(response.data);
      // setBillInFo(response.data);
      // setCustomer({
      //   ten: response.data.tenKhachHang,
      //   sdt: response.data.sdt,
      //   email: response.data.email,
      //   diaChi: response.data.diaChi
      // });
      // setOrderInfo({
      //   ten: response.data.tenKhachHang,
      //   sdt: response.data.sdt,
      //   email: response.data.email,
      //   diaChi: '',
      //   province: '',
      //   district: '',
      //   ward: '',
      //   ghiChu: ''
      // });
    }
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => alert('Print success')
  });
  return (
    <>
      <div style={{ display: hiden ? 'none' : 'block' }}>
        <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
          <div style={{ display: 'block', padding: '20px' }}>
            <div className="text-center mb-4">
              <h1 className="mb-0 text-danger">HÓA ĐƠN BÁN HÀNG</h1>
              <p>Mã hóa đơn: {bill.ma}</p>
              <p>Ngày: 22/01/2024</p>
            </div>

            <div className="mb-4">
              <strong>Công ty: Comnoone</strong>
              <br />
              Địa chỉ: Cao đẳng FPT Polytechnic, Bắc Từ Liêm, Hà Nội
              <br />
              Email: manh@gmail.com
              <br />
              <br />
              <strong>Nhân viên bán hàng: Mnah </strong>
              <br />
              Khách hàng: {bill.tenKhachHang || 'Khách lẻ'}
              <br />
              SĐT: {bill.sdt || ''}
            </div>

            <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>STT</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {serials.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.price.toLocaleString('vi-VN')} VNĐ</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-end">
              <div className="text-end">
                <p>Tổng số lượng: {bill.tongSanPham}</p>
                <p>Tổng tiền hàng: {parseInt(bill.tongTienBanDau || 5).toLocaleString() || '0 5'} VNĐ</p>
                <p>Chiết khấu: KKKKKKKKK</p>
                <p>Khách phải trả: {parseInt(bill.tongTienPhaiTra || 0).toLocaleString() || '0'} </p>
                <p>Tiền khách đưa: KKKKKKKKKK</p>
              </div>
            </div>

            <div className="text-center mt-4">
              <p>Cảm ơn quý khách, hẹn gặp lại!</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePrint} className="btn btn-primary">
        <h1>Print this out</h1>
      </button>
    </>
  );
}

export default PdfForm;
