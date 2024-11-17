import React from 'react'
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { IconEye } from '@tabler/icons-react';
import { Autocomplete , TextField, Button,Switch } from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import SelectDropOneValueForUpdate from './ui-component/SelectDropOneValueForUpdate.jsx';
import AlertDialogSlide from '../sanpham/ui-component/AlertDialogSlide.jsx';
import SerialNumberViewFromSPCT from '../sanpham/ui-component/SerialNumberViewFromSPCT.jsx';
import AddSPCT from './ui-component/AddSPCT.jsx';
import { useParams } from 'react-router-dom';  
import { useState } from 'react';
import { useEffect } from 'react';
import { color } from 'framer-motion';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconCirclePlus } from '@tabler/icons-react';

const SuaSanPham = () => {
  const { id } = useParams();  
  const [openSeri, setOpenSeri] = useState(false); // openViewSeri

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

  const [nhuCauEntityChecked, setNhuCauEntityChecked] = useState({});
  const [thuongHieuEntityChecked, setThuongHieuEntityChecked] = useState({});
  const [VGAEntityChecked, setVGAEntityChecked] = useState({});
  const [webcamEntityChecked, setWebcamEntityChecked] = useState({});
  const [manHinhEntityChecked, setManHinhEntityChecked] = useState({});
  const [banPhimEntityChecked, setBanPhimEntityChecked] = useState({});
  const [heDieuHanhEntityChecked, setHeDieuHanhEntityChecked] = useState({});
  

  // useEffect(() => {
  //     console.log('nhuCauEntityChecked: ', nhuCauEntityChecked); 
  // },[nhuCauEntityChecked])
  // useEffect(() => {
  //   console.log('thuongHieuEntityChecked: ', thuongHieuEntityChecked); 
  // },[thuongHieuEntityChecked])


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
  const [idSPCT, setIdSPCT] = useState();

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

  const fetchDataBienThe = async () => {
    const dataSpct = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-product-id?idProduct=${id}`);
    setspct(dataSpct.data.data);
  }

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
    const VGATemp = vgaResult.data.data.filter(x => x.ten == dataSpct.data.data[0].vga);

    const manHinhTemp = manHinhResult.data.data.filter(x => x.ten == dataSpct.data.data[0].manHinh);
    const webCamTemp = webcamResult.data.data.filter(x => x.ten == dataSpct.data.data[0].webcam);
    const heDieuHanhTemp = heDieuHanhResult.data.data.filter(x => x.ten == dataSpct.data.data[0].heDieuHanh);
    const banPhimTemp = banPhimResult.data.data.filter(x => x.ten == dataSpct.data.data[0].banPhim);
    console.log('VGATemp: ', VGATemp[0]); 
    console.log('manHinhTemp: ', manHinhTemp); 

    setNhuCauEntityChecked(nhuCauTemp[0]);
    setThuongHieuEntityChecked(thuongHieuTemp[0]);
    setVGAEntityChecked(VGATemp[0]);
    setManHinhEntityChecked(manHinhTemp[0]);
    setBanPhimEntityChecked(banPhimTemp[0]);
    setHeDieuHanhEntityChecked(heDieuHanhTemp[0]);
    setWebcamEntityChecked(webCamTemp[0]);
  }

  const updateHandle = async () => {
    let spUpdate = {
      tenSP: tenSanPham,
      moTa: moTaSanPham,
      idThuongHieu: thuongHieuChecked, 
      idNhuCau: nhuCauChecked,
      idVGA: VGAChecked,
      idWebcam: webcamChecked,
      idManHinh: manHinhChecked,
      idBanPhim: banPhimChecked,
      idHeDieuHanh: heDieuHanhChecked
    }
    if (spUpdate.tenSP.trim() === '' || spUpdate.moTa.trim() === ''){
      alert("Vui lòng điền đủ thông tin")
      return;
    }
    console.log('spUpdate: ', spUpdate);

    try {
      const check = await axios.get(`http://localhost:8080/api/san-pham/exist-name-for-update?ten=${spUpdate.tenSP}&id=${id}`);
      if (check.data.data){
        alert("Tên sản phẩm đã tồn tại");
        return;
      }
    } catch (error) {  
      // Xử lý lỗi  
      console.error('Có lỗi xảy ra khi check tên:', error);  
      return;
    }  

    try {
      await axios.put(`http://localhost:8080/api/san-pham/updateSanPhamAndSPCT/${id}`, spUpdate);
      alert('Cập nhật thành công');
    } catch (error) {  
      // Xử lý lỗi  
      console.error('Có lỗi xảy ra:', error);  
      alert('Cập nhật không thành công. Vui lòng thử lại.');  
    }  
  }

 // list anh
 const [listImg, setListImg] = useState([]);
  //////// SERI VIEW /////////////////
  const [listSeri, setListSeri] = useState([]);
  useEffect(() => {
    console.log('listSeri: ', listSeri);
  }, [listSeri])

    const handleViewSerial = async (id) => {
      // view serial ở đây
      console.log('spctId: ', id); 
      const seriGet = await axios.get(`http://localhost:8080/api/serial-number/find-by-spct-id/${id}`);
      setListSeri(seriGet.data.data);
      const imgListGet = await axios.get(`http://localhost:8080/api/anh-san-pham/find-by-spct-id?idSPCT=${id}`);
      setListImg(imgListGet.data.data);
      setIdSPCT(id);
      setOpenSeri(true);
    }


  ///// Bảng biến thể ///////////
 
 

  ///// Bảng biến thể ///////////
  const [isOpenAddSPCT, setIsOpenAddSPCT] = useState(false);
  const openAddSPCT = (status) => {
    setIsOpenAddSPCT(status);
  }

  const handleSwitchChange = (id) => (e) => {
    e.target.checked ? suaTrangThai(id, 1) : suaTrangThai(id, 0);
};

const suaTrangThai = (id, status) => {
    axios.get(`http://localhost:8080/api/san-pham-chi-tiet/change-status?idSPCT=${id}&status=${status}`)
        .then(response => {
          fetchDataBienThe();
        })
        .catch(error => {
          fetchDataBienThe();
        });
};

  return (
    <>
      <MainCard>
        <div>
          <div style={{ padding: '10px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bolder', marginBottom: '20px' }}>Sửa sản phẩm</h3>
            <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'space-between' }}>
            <TextField 
                id="nameProduct" 
                label="Tên sản phẩm" 
                variant="outlined" 
                fullWidth 
                color="secondary"
                value={tenSanPham}
                onChange={(e) => setTenSanPham(e.target.value)}
                />

              <TextField
                id="codeProduct"
                label="Mã sản phẩm"
                variant="outlined"
                color="secondary"
                value={maSanPham}
                sx={{ width: '30%', color: '#FF5555', marginLeft: '20px' }}
                placeholder="Nhập mã hoặc mã tự sinh"
                disabled
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
                onChange={(e) => setMotaSanPham(e.target.value)}
                />
            </div>
          </div>
          <div>
            <SelectDropOneValueForUpdate valueOld={thuongHieuEntityChecked} list={thuongHieu} setValueSelect={setThuongHieuChecked} name={'Thương hiệu'} />
            <SelectDropOneValueForUpdate valueOld={nhuCauEntityChecked} list={nhuCau} setValueSelect={setNhuCauChecked} name={'Nhu cầu'} />
            <SelectDropOneValueForUpdate valueOld={VGAEntityChecked} list={VGA} setValueSelect={setVGAChecked} name={'VGA'} />
            <SelectDropOneValueForUpdate valueOld={webcamEntityChecked} list={webcam} setValueSelect={setWebcamChecked} name={'Webcam'} />
            <SelectDropOneValueForUpdate valueOld={manHinhEntityChecked} list={manHinh} setValueSelect={setManHinhChecked} name={'Màn hình'} />
            <SelectDropOneValueForUpdate valueOld={banPhimEntityChecked} list={banPhim} setValueSelect={setBanPhimChecked} name={'Bàn phím'} />
            <SelectDropOneValueForUpdate valueOld={heDieuHanhEntityChecked} list={heDieuHanh} setValueSelect={setHeDieuHanhChecked} name={'Hệ điều hành'} />
          <Button variant="contained" onClick={updateHandle} color="secondary" sx={{ height: '60px', borderRadius: '7px', marginTop: '10px' }}>
              <IconCheck /> Sửa
            </Button>
          </div>
        </div>

        <div>
          {/* <AlertDialogSlide title={title} message={message} open={open} setOpen={setOpen} /> */}
        </div>
      </MainCard>

      <MainCard sx={{marginTop: "20px"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bolder', marginBottom: '20px' }}>Danh sách biến thể</h3>
          </div>
          <div>
            <Button title='Thêm biến thể' onClick={() => openAddSPCT(true)}><IconCirclePlus stroke={2} /></Button>
          </div>
        </div>
        <div>
          {isOpenAddSPCT && <AddSPCT
            idSP={id}
            setIsOpenAddSCPT={openAddSPCT}
            fetchDataBienThe={fetchDataBienThe}
          />}
        </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Mã</TableCell>
            <TableCell align="left">RAM</TableCell>
            <TableCell align="left">CPU</TableCell>
            <TableCell align="left">Ổ cứng</TableCell>
            <TableCell align="left">Màu sắc</TableCell>
            <TableCell align="left">Giá bán</TableCell>
            <TableCell align="left">Chi tiết</TableCell>
            <TableCell align="left">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spct.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{row.ma}</TableCell>
              <TableCell align="left">{row.ram}</TableCell>
              <TableCell align="left">{row.cpu}</TableCell>
              <TableCell align="left">{row.ocung}</TableCell>
              <TableCell align="left">{row.mauSac}</TableCell>
              <TableCell align="left">{row.giaBan} đ</TableCell>
              <TableCell align="left"><IconEye onClick={() => handleViewSerial(row.id)} stroke={2} /><p sx={{color: '#85EA2D'}}>{row.listSerialNumber !== '' ? row.listSerialNumber.split(',').length : 0}</p>  </TableCell>
              <TableCell align="left">
                {row.trangThai === 1 ?
                  <Switch defaultChecked color="secondary"
                          onChange={handleSwitchChange(row.id)}/>
                    :
                  <Switch onChange={handleSwitchChange(row.id)} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </MainCard>
      <SerialNumberViewFromSPCT
        setOpen={setOpenSeri}
        tilte="Danh sách serial number"
        open={openSeri}
        list={listSeri}
        idSP={id}
        idSPCT={idSPCT}
        setListSPCT={setspct}
        listImg={listImg}
      />
    </>
  )
}



export default SuaSanPham
