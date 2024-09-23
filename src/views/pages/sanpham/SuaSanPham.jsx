import React from 'react'
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Autocomplete , TextField } from '@mui/material';
import SelectDropOneValueForUpdate from './ui-component/SelectDropOneValueForUpdate.jsx';
import AlertDialogSlide from '../sanpham/ui-component/AlertDialogSlide.jsx';
import { useParams } from 'react-router-dom';  
import { useState } from 'react';
import { useEffect } from 'react';

const SuaSanPham = () => {
  const { id } = useParams();  

  ///////////////////
  // Data cho các combobox thuộc tính
  const [nhuCau, setNhuCau] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [ram, setRam] = useState([]);
  const [mauSac, setmauSac] = useState([]);
  const [CPU, setCPU] = useState([]);
  const [VGA, setVGA] = useState([]);
  const [webcam, setWebcam] = useState([]);
  const [oCung, setOCung] = useState([]);
  const [manHinh, setManHinh] = useState([]);
  const [heDieuHanh, setHeDieuHanh] = useState([]);
  const [banPhim, setBanPhim] = useState([]);


  // Danh sách các giá trị được chọn
  const [nhuCauChecked, setNhuCauChecked] = useState('');
  const [thuongHieuChecked, setThuongHieuChecked] = useState('');

  // Bảng chỉ chọn 1 giá trị
  const [VGAChecked, setVGAChecked] = useState('');
  const [webcamChecked, setWebcamChecked] = useState('');
  const [manHinhChecked, setManHinhChecked] = useState('');
  const [heDieuHanhChecked, setHeDieuHanhChecked] = useState('');
  const [banPhimChecked, setBanPhimChecked] = useState('');
  const [tenSanPham, setTenSanPham] = useState('');
  const [moTaSanPham, setMotaSanPham] = useState('');
  const [maSanPham, setMaSanPham] = useState('');
  //////////////////sanPhamList

  // Data thông tin sản phẩm và list spct
  const [sanPham, setSanPham] = useState();
  const [spct, setspct] = useState([]);

  useEffect(() => {
    console.log('sanPham: ', sanPham)
  }, [sanPham])
  useEffect(() => {
    console.log('spct: ', spct)
  }, [spct])

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    
  }, [VGAChecked]);

  useEffect(() => {
    
  }, [heDieuHanhChecked]);

  useEffect(() => {
    
  }, [webcamChecked]);
  useEffect(() => {
    
  }, [manHinhChecked]);
  useEffect(() => {
    
  }, [banPhimChecked]);
  useEffect(() => {
    console.log('thuongHieuChecked: ', thuongHieuChecked); 
  }, [thuongHieuChecked]);
  useEffect(() => {
    console.log('nhuCauChecked: ', nhuCauChecked);
  }, [nhuCauChecked]);

  const loadData = async () => {
    const dataSanPham = await axios.get(`http://localhost:8080/api/san-pham/detail/${id}`)
    const dataSpct = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-product-id?idProduct=${id}`);
    setSanPham(dataSanPham.data.data);
    setspct(dataSpct.data.data);
    setTenSanPham(dataSanPham.data.data.ten)
    setMaSanPham(dataSanPham.data.data.ma)
    setMotaSanPham(dataSanPham.data.data.moTa)
    // thuộc tính
    
    const nhuCauResult = await axios.get(`http://localhost:8080/api/nhu-cau/all-list-active`);
    const thuongHieuResult = await axios.get(`http://localhost:8080/api/thuong-hieu/all-list-active`);
    const ramResult = await axios.get(`http://localhost:8080/api/ram/all-list-active`);
    const mauSacResult = await axios.get(`http://localhost:8080/api/mau-sac/all-list-active`);
    const cpuResult = await axios.get(`http://localhost:8080/api/cpu/all-list-active`);
    const vgaResult = await axios.get(`http://localhost:8080/api/vga/all-list-active`);
    const webcamResult = await axios.get(`http://localhost:8080/api/webcam/all-list-active`);
    const oCungResult = await axios.get(`http://localhost:8080/api/o-cung/all-list-active`);
    const manHinhResult = await axios.get(`http://localhost:8080/api/man-hinh/all-list-active`);
    const heDieuHanhResult = await axios.get(`http://localhost:8080/api/he-dieu-hanh/all-list-active`);
    const banPhimResult = await axios.get(`http://localhost:8080/api/ban-phim/all-list-active`);

    
    setNhuCau(nhuCauResult.data.data);
    setThuongHieu(thuongHieuResult.data.data);
    setRam(ramResult.data.data);
    setmauSac(mauSacResult.data.data);
    setCPU(cpuResult.data.data);
    setVGA(vgaResult.data.data);
    setWebcam(webcamResult.data.data);
    setOCung(oCungResult.data.data);
    setManHinh(manHinhResult.data.data);
    setHeDieuHanh(heDieuHanhResult.data.data);
    setBanPhim(banPhimResult.data.data);

    console.log('nhuCauResult.data.data: ', nhuCauResult.data.data); 
    const nhuCauTemp = nhuCauResult.data.data.filter(x => x.ten == dataSanPham.data.data.nhuCau);
    const thuongHieuTemp = thuongHieuResult.data.data.filter(x => x.ten == dataSanPham.data.data.thuongHieu);
    console.log('nhuCauTemp: ', nhuCauTemp); 
    console.log('thuongHieuTemp: ', thuongHieuTemp); 
    setNhuCauChecked(nhuCauTemp[0]);
    setThuongHieuChecked(thuongHieuTemp[0]);
  }

  

  return (
    <>
      <MainCard>
        <div>
          <div style={{ padding: '10px' }}>
            <h3>Sửa sản phẩm</h3>
            <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'space-between' }}>
            <TextField 
                id="nameProduct" 
                label="Tên sản phẩm" 
                variant="outlined" 
                fullWidth 
                color="secondary"
                value={tenSanPham}
                onChange={(e) => setMota(e.target.value)}
                />

              <TextField
                id="codeProduct"
                label="Mã sản phẩm"
                variant="outlined"
                color="secondary"
                value={maSanPham}
                sx={{ width: '30%' }}
                placeholder="Nhập mã hoặc mã tự sinh"
              />
            </div>
            <div>
              <TextField 
                id="descriptionProduct" 
                label="Mô tả sản phẩm" 
                multiline rows={4} 
                variant="outlined" 
                fullWidth 
                value={moTaSanPham}
                color="secondary"
                onChange={(e) => setMota(e.target.value)}
                />
            </div>
          </div>
          <div>
            <SelectDropOneValueForUpdate valueOld={thuongHieuChecked} list={thuongHieu} setValueSelect={setThuongHieuChecked} name={'Thương hiệu'} />
            <SelectDropOneValueForUpdate valueOld={nhuCauChecked} list={nhuCau} setValueSelect={setNhuCauChecked} name={'Nhu cầu'} />
            <SelectDropOneValueForUpdate list={VGA} setValueSelect={setVGAChecked} name={'VGA'} />
            <SelectDropOneValueForUpdate list={webcam} setValueSelect={setWebcamChecked} name={'Webcam'} />
            <SelectDropOneValueForUpdate list={manHinh} setValueSelect={setManHinhChecked} name={'Màn hình'} />
            <SelectDropOneValueForUpdate list={banPhim} setValueSelect={setBanPhimChecked} name={'Bàn phím'} />
            <SelectDropOneValueForUpdate list={heDieuHanh} setValueSelect={setHeDieuHanhChecked} name={'Hệ điều hành'} />
          </div>
        </div>

        <div>
          {/* <AlertDialogSlide title={title} message={message} open={open} setOpen={setOpen} /> */}
        </div>
      </MainCard>
    </>
  )
}

export default SuaSanPham
