import  React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelectDropOneValue from './SelectDropOneValue.jsx';
import MainCard from 'ui-component/cards/MainCard';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import { backEndUrl } from '../../../../utils/back-end.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AddSPCT({ idSP, setIsOpenAddSCPT, fetchDataBienThe }) {
  const [variant, setVariant] = useState({});
  useEffect(()=>{
    console.log('variant: ', variant);
  }, [variant]);

  const [ram, setRam] = useState([]);
  const [mauSac, setmauSac] = useState([]);
  const [CPU, setCPU] = useState([]);
  const [oCung, setOCung] = useState([]);

  const [ramChecked, setRamChecked] = useState('');
  const [mauSacChecked, setMauSacChecked] = useState('');
  const [CPUChecked, setCPUChecked] = useState('');
  const [oCungChecked, setOCungChecked] = useState('');
  useEffect(()=>{
    setVariant(prev => ({...prev, ramId: ramChecked}))
  }, [ramChecked]);
  useEffect(()=>{
    setVariant(prev => ({...prev, mauSacId: mauSacChecked}))
  }, [mauSacChecked]);
  useEffect(()=>{
    setVariant(prev => ({...prev, cpuId: CPUChecked}))
  }, [CPUChecked]);
  useEffect(()=>{
    setVariant(prev => ({...prev, ocungId: oCungChecked}))
  }, [oCungChecked]);

  useEffect(() => {
    setVariant({
        giaBan: 0,
        trangThai: 0,
        cpuId: 0,
        ramId: 0,
        ocungId: 0,
        mauSacId: 0,

        banPhimId: 0,
        heDieuHanhId: 0,
        manHinhId: 0,
        sanPhamId: idSP,
        vgaId: 0,
        webcamId: 0,

        listSerialNumber: "",
        listUrlAnhSanPham: "",
    })
    loadAttributes();
  }, []);

  const [listSPCT, setListSPCT] = useState([]);

  const loadAttributes = async () => {
    // get các bảng
    const SPCTResult = await axios.get(`${backEndUrl}/san-pham-chi-tiet/get-by-product-id?idProduct=${idSP}`);
    const ramResult = await axios.get(`${backEndUrl}/ram/all-list-active`);
    const mauSacResult = await axios.get(`${backEndUrl}/mau-sac/all-list-active`);
    const cpuResult = await axios.get(`${backEndUrl}/cpu/all-list-active`);
    const oCungResult = await axios.get(`${backEndUrl}/o-cung/all-list-active`);
    setListSPCT(SPCTResult.data.data);
    const spctTemp = SPCTResult.data.data[0];
    console.log('spctTemp: ', spctTemp); 
    setVariant(prev => ({
        ...prev,
        banPhimId: spctTemp.idBanPhim,
        heDieuHanhId: spctTemp.idHeDieuHanh,
        manHinhId: spctTemp.idManHinh,
        sanPhamId: idSP,
        vgaId: spctTemp.idVGA,
        webcamId: spctTemp.idWebcam,
    }));
    setRam(ramResult.data.data);
    setmauSac(mauSacResult.data.data);
    setCPU(cpuResult.data.data);
    setOCung(oCungResult.data.data);
  };
  
  const checkAttributeSelected = async () => {
    if (variant.ramId == 0 || variant.cpuId == 0 || variant.mauSacId == 0 || variant.ocungId == 0 || variant.giaBan == 0){
        alert("Vui lòng điền đủ thông tin")
        return;
    }

    try{
        const check = await axios.post(`${backEndUrl}/san-pham-chi-tiet/valid-for-add`, variant);
    } catch (error){
        if (error.response.status){
            alert("Đã tồn tại biến thể này");
            return;
        }
    }
    for(let i = 0; i < listSPCT.length; i++){
        if (variant.mauSacId === listSPCT[i].idMauSac){
            variant.listUrlAnhSanPham = listSPCT[i].listUrlAnhSanPham
        }
    }
    const addResult = await axios.post(`${backEndUrl}/san-pham-chi-tiet/add`, variant);
        if (addResult.data.code == 200){
            alert("Thêm thành công");
            // điều hướng tới trang sửa
            fetchDataBienThe();
        } else {
            alert("Thêm thất bại");
        }
  }
  function formatCurrency(amount, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      currency: currency
    }).format(amount);
  }

  const handleGiaBan = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setVariant(prev => ({...prev, giaBan: value}))
  };



  // theme

  
    
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{  
            style: {  
              width: '100%', // Thay đổi kích thước tại đây  
              maxWidth: '1200px', // Kích thước tối đa (nếu cần thiết)  
              height: '800px'
            }  
          }}
      >
        <DialogTitle>Thêm biến thể</DialogTitle>
        <DialogContent>
        <MainCard style={{ marginTop: "20px" }}>
            <div style={{ padding: '10px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bolder', marginBottom: '20px' }}>Chọn các thuộc tính</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <SelectDropOneValue fetchAgain={loadAttributes} list={ram} setValueSelect={setRamChecked} name={'RAM'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={CPU} setValueSelect={setCPUChecked} name={'CPU'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={oCung} setValueSelect={setOCungChecked} name={'Ổ cứng'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={mauSac} setValueSelect={setMauSacChecked} name={'Màu sắc'} />
            </div>
            <div style={{display: "flex", marginTop: "30px"}}>
            <div>
            <TextField
            value={formatCurrency(variant.giaBan)}
            onChange={handleGiaBan}
            label="Giá bán"
            variant="standard"
            fullWidth
            color="secondary"
            />
            </div>
            <div>
            <Button variant="contained" onClick={checkAttributeSelected} color="secondary" sx={{ height: '60px', borderRadius: '7px' }}>
            <IconCheck />
            </Button>
            </div>
            </div>
            
            </div>
        </MainCard>

        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={() => setIsOpenAddSCPT(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}
