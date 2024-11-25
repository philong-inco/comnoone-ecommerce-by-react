import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Button, TextField, Autocomplete, Card, CardMedia, CardContent, Typography, CardActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ListVariant from '../sanpham/ui-component/ListVariant.jsx';
import TableVariant from '../sanpham/ui-component/TableVariant.jsx';
import SelectDropdownForAdd from '../sanpham/ui-component/SelectDropDownForAdd.jsx';
import AlertDialogSlide from '../sanpham/ui-component/AlertDialogSlide.jsx';
import SelectDropOneValue from './ui-component/SelectDropOneValue.jsx';
import { IconCheck } from '@tabler/icons-react';
import UploadWidget from 'ui-component/cloudinary/UploadWidget.jsx';
import { margin, width } from '@mui/system';
import { createSanPham } from 'api/sanpham/sanPham.js';
import { checkToAdd, createSanPhamChiTiet } from 'api/sanpham/chiTietSanPham.js';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification.js';
import { backEndUrl } from '../../../utils/back-end.js';

const ThemSanPham = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [urlImages, setUrlImages] = useState(['https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg','https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg']);

  // Data for filters
  const [sanPham, setSanPham] = useState([]);
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
  // Bảng gen biến thể
  const [ramChecked, setRamChecked] = useState([]);
  const [mauSacChecked, setmauSacChecked] = useState([]);
  const [CPUChecked, setCPUChecked] = useState([]);
  const [oCungChecked, setOCungChecked] = useState([]);
  // Bảng chỉ chọn 1 giá trị
  const [VGAChecked, setVGAChecked] = useState('');
  const [webcamChecked, setWebcamChecked] = useState('');
  const [manHinhChecked, setManHinhChecked] = useState('');
  const [heDieuHanhChecked, setHeDieuHanhChecked] = useState('');
  const [banPhimChecked, setBanPhimChecked] = useState('');
  const [tenSanPham, setTenSanPham] = useState('');
  const [moTa, setMota] = useState('');

  // ảnh sản phâm
  const [listAnh, setListAnh] = useState([]);

  // cho phép upload ảnh tiếp
  const [isValidToUpload, setIsValidToUpload] = useState(true);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    // get các bảng
    const sanPhamResult = await axios.get(`${backEndUrl}/san-pham/all-list-active`);
    const nhuCauResult = await axios.get(`${backEndUrl}/nhu-cau/all-list-active`);
    const thuongHieuResult = await axios.get(`${backEndUrl}/thuong-hieu/all-list-active`);
    const ramResult = await axios.get(`${backEndUrl}/ram/all-list-active`);
    const mauSacResult = await axios.get(`${backEndUrl}/mau-sac/all-list-active`);
    const cpuResult = await axios.get(`${backEndUrl}/cpu/all-list-active`);
    const vgaResult = await axios.get(`${backEndUrl}/vga/all-list-active`);
    const webcamResult = await axios.get(`${backEndUrl}/webcam/all-list-active`);
    const oCungResult = await axios.get(`${backEndUrl}/o-cung/all-list-active`);
    const manHinhResult = await axios.get(`${backEndUrl}/man-hinh/all-list-active`);
    const heDieuHanhResult = await axios.get(`${backEndUrl}/he-dieu-hanh/all-list-active`);
    const banPhimResult = await axios.get(`${backEndUrl}/ban-phim/all-list-active`);
    const anhSanPhamAll = await axios.get(`${backEndUrl}/anh-san-pham/list`);

    setSanPham(sanPhamResult.data.data);
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
    setListAnh(anhSanPhamAll.data.data);
  };

  const [productVarriant, setProductVarriant] = useState([]);
  const [selectAttribute, setSelectAttribute] = useState({}); // các đối tượng attributeKey và value
  const [selectedKey, setSelectedKey] = useState([]); // các key được select
  const [resultVariant, setResultVariant] = useState([]); // thằng này nhận kết quả cuối cùng của TableVariant

  const checkTenSP = async (name) => {
    const checkUniqueNameProduct = await axios.get(`${backEndUrl}/san-pham/exist-name?name=${name}`);
    console.log('checkUniqueNameProduct: ', checkUniqueNameProduct); 
    if (checkUniqueNameProduct.data.code === 999) {
      return false;
    }
    return true;
  }

  const handleUpdateContinue = async () => {
    let check = true;
    if (VGAChecked === '' || moTa === '' || tenSanPham === '' || banPhimChecked === '' 
    ||heDieuHanhChecked === '' || manHinhChecked === '' || webcamChecked === '' 
    || nhuCauChecked === '' || thuongHieuChecked === '' || VGAChecked === undefined 
    || moTa === undefined || tenSanPham === undefined || banPhimChecked === undefined 
    ||heDieuHanhChecked === undefined || manHinhChecked === undefined || webcamChecked === undefined 
    || nhuCauChecked === undefined || thuongHieuChecked === undefined)
    {
      check = false;
      showAlertMessage('Hãy nhập thông tin sản phẩm')
    }
    let isUnique = await checkTenSP(tenSanPham);
    if (!isUnique) {
      showAlertMessage("Tên sản phẩm đã tồn tại")
    }
      console.log('--VGAChecked: ', VGAChecked);
      console.log('--moTa: ', moTa);
      console.log('--tenSanPham: ', tenSanPham);
      console.log('--banPhimChecked: ', banPhimChecked);
      console.log('--heDieuHanhChecked: ', heDieuHanhChecked);
      console.log('--manHinhChecked: ', manHinhChecked);
      console.log('--webcamChecked: ', webcamChecked);
      console.log('--nhuCauChecked: ', nhuCauChecked);
      console.log('--thuongHieuChecked: ', thuongHieuChecked);
      console.log('--check: ', check);
      console.log('--resultVariant.length > 0: ', resultVariant.length > 0);
      console.log('--isUnique: ', isUnique);
    //thực hiện kiểm tra lại các thuộc tính chung và sửa đổi vào result rồi sau đó tạo sản phẩm
    if (check == true && resultVariant.length > 0 && isUnique) {
      handleCreateProduct();
    }
  }

  useEffect(() => {
    console.log('resultVariant truyền lên cha: ', resultVariant)
  }, [resultVariant])

  useEffect(() => {
    const checkKey = Object.keys(selectAttribute);
    if (checkKey.length > 0) {
      const keys = Object.keys(selectAttribute);
      keys.sort((a, b) => {
        return selectAttribute[a].length - selectAttribute[b].length;
      });
      const removeKeyMauSac = keys.filter(i => i !== "mauSac");
      removeKeyMauSac.push("mauSac");
      console.log('Key sau khi đổi chỗ: ',removeKeyMauSac);
      setSelectedKey(removeKeyMauSac);
    }
  }, [selectAttribute]);

  const [selectedKeyToChild, setSelectedKeyToChild] = useState([]);

  useEffect(() => {
    console.log('Giá trị selectedKey: ', selectedKey);
    if (selectedKey.length === 4) {
      generateVariant(0, defaultVariant);
      setSelectedKeyToChild(selectedKey);
    } else if (selectedKey.length !== 4 && selectedKey.length !== 0) {
      showAlertMessage('Thiếu thông tin để tạo biến thể', 'Vui lòng chọn đủ 4 thuộc tính Ram, Cpu, Ổ cứng, màu sắc')
    }
  }, [selectedKey]);


  useEffect(() => { // nếu quá số ảnh cho phép sẽ ẩn nút tải anh
    if (urlImages.length >= (mauSacChecked.length * 3)){
      setIsValidToUpload(false);
    }
    console.log('urlImages: ', urlImages)
  }, [urlImages])

  useEffect(() => {
    if (mauSacChecked.length > 0){
      setIsValidToUpload(true)
    }
  }, [mauSacChecked])

  const [defaultVariant, setDefaultVariant] = useState({
    giaBan: '',
    trangThai: 1,
    RAM: null,
    CPU: null,
    oCung: null,
    mauSac: null,
    banPhim: null,
    manHinh: null,
    VGA: null,
    heDieuHanh: null,
    webcam: null,
    serialNumberList: [],
    anhSanPham: []
  });

  const [defaultProduct, setDefaultProduct] = useState({
    ten: '',
    moTa: '',
    trangThai: '',
    nhuCauId: '',
    thuongHieuId: ''
  });

  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      VGA: VGAChecked
    }));
    if (resultVariant.length > 0){
      const temp = resultVariant.map(x => (
        {
          ...x,
          VGA: VGAChecked
        }
      ))
      setResultVariant(temp);
    }
  }, [VGAChecked]);

  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      heDieuHanh: heDieuHanhChecked
    }));
    if (resultVariant.length > 0){
      const temp = resultVariant.map(x => (
        {
          ...x,
          heDieuHanh: heDieuHanhChecked
        }
      ))
      setResultVariant(temp);
    }
  }, [heDieuHanhChecked]);

  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      webcam: webcamChecked
    }));
    if (resultVariant.length > 0){
      const temp = resultVariant.map(x => (
        {
          ...x,
          webcam: webcamChecked
        }
      ))
      setResultVariant(temp);
    }
  }, [webcamChecked]);
  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      manHinh: manHinhChecked
    }));
    if (resultVariant.length > 0){
      const temp = resultVariant.map(x => (
        {
          ...x,
          manHinh: manHinhChecked
        }
      ))
      setResultVariant(temp);
    }
  }, [manHinhChecked]);
  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      banPhim: banPhimChecked
    }));
    if (resultVariant.length > 0){
      const temp = resultVariant.map(x => (
        {
          ...x,
          banPhim: banPhimChecked
        }
      ))
      setResultVariant(temp);
    }
  }, [banPhimChecked]);
  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      thuongHieu: thuongHieuChecked
    }));
    if (resultVariant.length > 0){
      const temp = resultVariant.map(x => (
        {
          ...x,
          thuongHieu: thuongHieuChecked
        }
      ))
      setResultVariant(temp);
    }
  }, [thuongHieuChecked]);
  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      nhuCau: nhuCauChecked
    }));
    if (resultVariant.length > 0){
      const temp = resultVariant.map(x => (
        {
          ...x,
          nhuCau: nhuCauChecked
        }
      ))
      setResultVariant(temp);
    }
  }, [nhuCauChecked]);

  //   const defaultVariant = {
  //     giaBan: '',
  //     trangThai: 1,
  //     RAM: null,
  //     CPU: null,
  //     oCung: null,
  //     mauSac: null,
  //     banPhim: null,
  //     manHinh: null,
  //     VGA: null,
  //     heDieuHanh: null,
  //     webcam: null,
  //     serialNumberList: []
  //   };

  // Generate varriant
  const checkAttributeSelected = () => {
    setSelectAttribute({});
    setProductVarriant([]);
    if (ramChecked.length > 0) {
      setSelectAttribute((prev) => ({
        ...prev,
        RAM: [...ramChecked]
      }));
    }
    if (CPUChecked.length > 0) {
      setSelectAttribute((prev) => ({
        ...prev,
        CPU: [...CPUChecked]
      }));
    }
    if (oCungChecked.length > 0) {
      setSelectAttribute((prev) => ({
        ...prev,
        oCung: [...oCungChecked]
      }));
    }
    if (mauSacChecked.length > 0) {
      setSelectAttribute((prev) => ({
        ...prev,
        mauSac: [...mauSacChecked]
      }));
    }
  };

  /**
   *   Để gen biến thể cần:
   *   1. Một đối tượng có key là tên thuộc tính, value là giá trị thuộc tính
   *   vd: {
   *           Ram: [4GB, 6GB, 8GB],
   *           Vga: [32GB, 64GB],
   *           Cpu: [CoreI3, CoreI5, CoreI7]
   *       }
   *   2. Một mảng các key thuộc tính lấy từ đối tượng trên (sử dụng Object.keys(obj) để lấy ra mảng các key)
   *   =>> từ đối tượng trên ta sẽ lấy được mảng sau ['Ram', 'Vga', 'Cpu']
   *
   *   Sau đó sử dụng đệ quy để gen biến thể, em thử chạy tay 2 bảng thử xem nó hoạt động thế nào nhé
   *
   *   hàm generateVariant() nhận vào index=0 và đối tượng rỗng, nó sẽ đệ quy lần lượt để gen ra từng biến thể
   */
  const generateVariant = (currentIndex, currentVariant) => {
    console.log('chạy generateVariant');
    // điểm dừng đệ quy khi build xong một biến thể
    if (currentIndex === selectedKey.length) {
      // thêm biến thể vào mảng
      setProductVarriant((prev) => [...prev, currentVariant]);
      return;
    }
    const nameKey = selectedKey[currentIndex];
    const valueOfKey = selectAttribute[nameKey];
    console.log('nameKey: ', nameKey);
    console.log('valueOfKey: ', valueOfKey);
    valueOfKey.forEach((value) => {
      const updateVariant = { ...currentVariant, [nameKey]: { ...value } };
      generateVariant(currentIndex + 1, updateVariant);
    });
  };

  useEffect(() => {
    console.log('productVarriant: ', productVarriant);
    console.log('selectAttribute: ', selectAttribute);
  }, [productVarriant]);

  const showAlertMessage = (title, message) => {
    setTitle(title);
    setMessage(message);
    setOpen(true);
  };

  const createProduct = async ({
    ten,
    trangThai,
    moTa,
    nhuCauId,
    thuongHieuId
  }) => {
    const res = await createSanPham({
      ten,
      trangThai,
      moTa,
      nhuCauId,
      thuongHieuId
    })

    if (!res) {
      toast.error(NotificationStatus.ERROR);
      return;
    }

    return res;
  }

  const createProductDetail = async ({
    giaBan,
    trangThai,
    banPhimId,
    cpuId,
    heDieuHanhId,
    manHinhId,
    mauSacId,
    ramId,
    sanPhamId,
    vgaId,
    webcamId,
    ocungId,
    listSerialNumber,
    listUrlAnhSanPham
  }) => {
    const res = await createSanPhamChiTiet({
      giaBan,
      trangThai,
      banPhimId,
      cpuId,
      heDieuHanhId,
      manHinhId,
      mauSacId,
      ramId,
      sanPhamId,
      vgaId,
      webcamId,
      ocungId,
      listSerialNumber,
      listUrlAnhSanPham
    })

    if (!res) {
      toast.error(NotificationStatus.ERROR);
      return;
    }

    return res;
  }

  // const checkValidToAdd = async ({
  //   giaBan,
  //   trangThai,
  //   banPhimId,
  //   cpuId,
  //   heDieuHanhId,
  //   manHinhId,
  //   mauSacId,
  //   ramId,
  //   sanPhamId,
  //   vgaId,
  //   webcamId,
  //   ocungId,
  //   listSerialNumber,
  //   listUrlAnhSanPham
  // }) => {
  //   const res = await checkToAdd({
  //     giaBan,
  //     trangThai,
  //     banPhimId,
  //     cpuId,
  //     heDieuHanhId,
  //     manHinhId,
  //     mauSacId,
  //     ramId,
  //     sanPhamId,
  //     vgaId,
  //     webcamId,
  //     ocungId,
  //     listSerialNumber:
  //       listUrlAnhSanPham
  //   })

  //   return res;
  // }

  const handleChangeMauChoAnh = (target) => {
    console.log(value)
  }
  
  const handleCreateProduct = async() => {
    const addProductRes = await createProduct({
      ten: tenSanPham,
      trangThai: 1,
      moTa: moTa,
      nhuCauId: nhuCauChecked,
      thuongHieuId: thuongHieuChecked
    })

    if(addProductRes.code === 999){
      toast.error(NotificationStatus.ERROR);
      return;
    }
    

    resultVariant.forEach(async (variant, index) => {
      let product = {
        giaBan: variant.giaBan,
        trangThai: variant.trangThai,
        banPhimId: variant.banPhim,
        cpuId: variant.CPU.id,
        heDieuHanhId: variant.heDieuHanh,
        manHinhId: variant.manHinh,
        mauSacId: variant.mauSac.id,
        ramId: variant.RAM.id,
        vgaId: variant.VGA,
        webcamId: variant.webcam,
        ocungId: variant.oCung.id,
        sanPhamId: addProductRes.id,
        listSerialNumber: '',
        listUrlAnhSanPham: ''
      }
      if (variant.serialNumberList.length > 0){
        product.listSerialNumber = variant.serialNumberList.join(',');
      }
      if (variant.anhSanPham.length > 0){
        product.listUrlAnhSanPham = variant.anhSanPham.join(',')
      }

      console.log('product: ', product)
      // const checkRes = await checkValidToAdd(product);
      // console.log({checkRes});
      
      // if(!checkRes || checkRes.code === 999){
      //   toast.error(checkRes.message);
      //   return;
      // }
      const addDetailRes = await createProductDetail(product);
      if(!addDetailRes || addDetailRes.code === 999){
        toast.error(NotificationStatus.ERROR);
        return;
      }
      if(index === (resultVariant.length - 1)){
        toast.success(NotificationStatus.CREATED);
        navigate(`/sanpham/danhsach`);
      }
    })
  }

  const SelectBoxColor = ({ title, options }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120, width: "90%" }}>
      <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        // value={age}
        label={title}
        onChange={handleChangeMauChoAnh}
      >
        {
          options && options.map(option =>
            <MenuItem value={option}>{option}</MenuItem>
          )
        }
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  )
}

  return (
    <>
      <MainCard>
        <div>
          <div style={{ padding: '10px' }}>
            <h3>Nhập thông tin sản phẩm</h3>
            <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'space-between' }}>
              <Autocomplete
                sx={{ width: '68%' }}
                id="free-solo-demo"
                freeSolo
                options={sanPham.map((option) => option.ten)}
                renderInput={(params) => (
                  <TextField {...params} id="nameProduct" label="Tên sản phẩm" variant="outlined" color="secondary" onChange={(e) => setTenSanPham(e.target.value)}/>
                )}
              />

              {/* <TextField
                id="codeProduct"
                label="Mã sản phẩm"
                variant="outlined"
                color="secondary"
                sx={{ width: '30%' }}
                placeholder="Nhập mã hoặc mã tự sinh"
              /> */}
            </div>
            <div>
              <TextField 
                id="descriptionProduct" 
                label="Mô tả sản phẩm" 
                multiline rows={4} 
                variant="outlined" 
                fullWidth 
                color="secondary"
                onChange={(e) => setMota(e.target.value)}
                />
            </div>
          </div>
          <div>
            <SelectDropOneValue fetchAgain={loadAttributes} list={thuongHieu} setValueSelect={setThuongHieuChecked} name={'Thương hiệu'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={nhuCau} setValueSelect={setNhuCauChecked} name={'Nhu cầu'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={VGA} setValueSelect={setVGAChecked} name={'VGA'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={webcam} setValueSelect={setWebcamChecked} name={'Webcam'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={manHinh} setValueSelect={setManHinhChecked} name={'Màn hình'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={banPhim} setValueSelect={setBanPhimChecked} name={'Bàn phím'} />
            <SelectDropOneValue fetchAgain={loadAttributes} list={heDieuHanh} setValueSelect={setHeDieuHanhChecked} name={'Hệ điều hành'} />
          </div>
        </div>

        <div>
          <AlertDialogSlide title={title} message={message} open={open} setOpen={setOpen} />
        </div>
      </MainCard>
      <MainCard style={{ marginTop: "20px" }}>
        <div style={{ padding: '10px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bolder', marginBottom: '20px' }}>Chọn các thuộc tính</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <SelectDropdownForAdd fetchAgain={loadAttributes} list={ram} setListChecked={setRamChecked} nameDropDown={'RAM'} />
            <SelectDropdownForAdd fetchAgain={loadAttributes} list={CPU} setListChecked={setCPUChecked} nameDropDown={'CPU'} />
            <SelectDropdownForAdd fetchAgain={loadAttributes} list={oCung} setListChecked={setOCungChecked} nameDropDown={'Ổ cứng'} />
            <SelectDropdownForAdd fetchAgain={loadAttributes} list={mauSac} setListChecked={setmauSacChecked} nameDropDown={'Màu sắc'} />
            <Button variant="contained" onClick={checkAttributeSelected} color="secondary" sx={{ height: '60px', borderRadius: '7px' }}>
              <IconCheck />
            </Button>
          </div>
        </div>
      </MainCard>
      <MainCard style={{ marginTop: "20px" }}>
        <div style={{ padding: '10px' }}>
          {productVarriant.length > 0 && (
            // <ListVariant
            // listKeySort={selectedKey}
            // variantList={productVarriant}
            // setVariantList={setProductVarriant}
            // showMessage={showAlertMessage} />

            <TableVariant
              listKeySort={selectedKeyToChild}
              variantListFromParent={productVarriant}
              setProductVarriant={setProductVarriant}
              showMessage={showAlertMessage}
              setResult={setResultVariant}
              actionFather={handleUpdateContinue}
              listAnh={listAnh}
              mauSacChecked={mauSacChecked}
            />
          )}
        </div>
      </MainCard>
    </>
  );
};

export default ThemSanPham;


