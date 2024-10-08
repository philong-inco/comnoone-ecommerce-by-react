import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { getBillByCode } from 'services/admin/bill/billService';
import { getAllSerialNumberSoldByBillId } from 'services/admin/serialNumberSold/serialNumberSoldService';

function PdfForm(props) {
  const { code, hiden } = props;
  const [bill, setBill] = useState({});
  const [serials, setSerials] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchBillData = async () => {
      const [billResponse, serialResponse] = await Promise.all([getBillByCode(code), getAllSerialNumberSoldByBillId(code)]);

      if (billResponse.status_code === 200) {
        setBill(billResponse.data);
      }

      if (serialResponse.status_code === 200) {
        setSerials(serialResponse.data);
      }
    };

    if (code) {
      fetchBillData();
    }
  }, [code]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => alert('Print success')
  });

  useEffect(() => {
    if (!hiden && code) {
      handlePrint();
    }
  }, [hiden, code, handlePrint]);

  return (
    <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
      <div style={{ padding: '20px' }}>
        <div className="text-center mb-4">
          <h1 className="mb-0 text-danger">HÓA ĐƠN BÁN HÀNG</h1>
          <p>Mã hóa đơn: {bill.ma}</p>
          <p>Ngày: {new Date().toLocaleDateString()}</p>
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
              <th>Giá</th>
              <th>Số lượng</th>
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
            <p>Tổng tiền hàng: {parseInt(bill.tongTienBanDau || 0).toLocaleString()} VNĐ</p>
            <p>Chiết khấu: KKKKKKKKK</p>
            <p>Khách phải trả: {parseInt(bill.tongTienPhaiTra || 0).toLocaleString()} VNĐ</p>
            <p>Tiền khách đưa: KKKKKKKKKK</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p>Cảm ơn quý khách, hẹn gặp lại!</p>
        </div>
      </div>
    </div>
  );
}

export default PdfForm;
