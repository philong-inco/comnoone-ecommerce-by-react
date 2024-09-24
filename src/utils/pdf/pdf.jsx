import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
function PdfForm(props) {
  const { serials, hiden } = props;
  console.log('Data : ', serials);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onAfterPrint: () => alert('Print success')
  });
  return (
    <>
      <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
        <div style={{ display: hiden ? 'none' : 'block' }}>
          <div className="text-center mb-4">
            <h1 className="mb-0 text-danger">HÓA ĐƠN BÁN HÀNG</h1>
            <p>Mã hóa đơn: 202322517887</p>
            <p>Ngày: 22/01/2024</p>
          </div>

          <div className="mb-4">
            <strong>Công ty: BPShop</strong>
            <br />
            Địa chỉ: Cao đẳng FPT Polytechnic, Bắc Từ Liêm, Hà Nội
            <br />
            Email: bpshopnews2023@gmail.com
            <br />
            <br />
            <strong>Nhân viên bán hàng: Lê Thị Vân Anh</strong>
            <br />
            Khách hàng: Nguyễn Phong Dũng
            <br />
            SĐT: 0395511234
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
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString('vi-VN')} ₫</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-right">
            <p>Tổng số lượng: 2</p>
            <p>Tổng tiền hàng: 64.000.000 ₫</p>
            <p>Chiết khấu: 7.000.000 ₫</p>
            <p>Khách phải trả: 57.000.000 ₫</p>
            <p>Tiền khách đưa: 57.000.000 ₫</p>
          </div>

          <div className="text-center mt-4">
            <p>Cảm ơn quý khách, hẹn gặp lại!</p>
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
