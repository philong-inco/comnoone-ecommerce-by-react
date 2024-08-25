import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { Button, TextField, Autocomplete } from '@mui/material';
import ListVariant from '../sanpham/ui-component/ListVariant.jsx';
import TableVariant from '../sanpham/ui-component/TableVariant.jsx';
import SelectDropdownForAdd from '../sanpham/ui-component/SelectDropDownForAdd.jsx';
import AlertDialogSlide from '../sanpham/ui-component/AlertDialogSlide.jsx';
import SelectDropOneValue from '../sanpham/ui-component/SelectDropOneValue.jsx';
import { IconCheck } from '@tabler/icons-react';

const ThemSanPham = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    // get các bảng
    const sanPhamResult = await axios.get(`http://localhost:8080/api/san-pham/all-list`);
    const nhuCauResult = await axios.get(`http://localhost:8080/api/nhu-cau/all-list`);
    const thuongHieuResult = await axios.get(`http://localhost:8080/api/thuong-hieu/all-list`);
    const ramResult = await axios.get(`http://localhost:8080/api/ram/all-list`);
    const mauSacResult = await axios.get(`http://localhost:8080/api/mau-sac/all-list`);
    const cpuResult = await axios.get(`http://localhost:8080/api/cpu/all-list`);
    const vgaResult = await axios.get(`http://localhost:8080/api/vga/all-list`);
    const webcamResult = await axios.get(`http://localhost:8080/api/webcam/all-list`);
    const oCungResult = await axios.get(`http://localhost:8080/api/o-cung/all-list`);
    const manHinhResult = await axios.get(`http://localhost:8080/api/man-hinh/all-list`);
    const heDieuHanhResult = await axios.get(`http://localhost:8080/api/he-dieu-hanh/all-list`);
    const banPhimResult = await axios.get(`http://localhost:8080/api/ban-phim/all-list`);

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
  };

  const [productVarriant, setProductVarriant] = useState([]);
  const [selectAttribute, setSelectAttribute] = useState({}); // các đối tượng attributeKey và value
  const [selectedKey, setSelectedKey] = useState([]); // các key được select
  const [resultVariant, setResultVariant] = useState([]); // thằng này nhận kết quả cuối cùng của TableVariant

  useEffect(()=>{
    // thực hiện kiểm tra lại các thuộc tính chung và sửa đổi vào result rồi sau đó tạo sản phẩm
    console.log('---------------')
    console.log(resultVariant)
  }, [resultVariant])

  useEffect(() => {
    const checkKey = Object.keys(selectAttribute);
    console.log('len: ', checkKey.length);
    if (checkKey.length > 0) {
      const keys = Object.keys(selectAttribute);
      keys.sort((a, b) => {
        return selectAttribute[a].length - selectAttribute[b].length;
      });
      setSelectedKey(keys);
      console.log('Sort by length: ', keys);
    }
  }, [selectAttribute]);

  const [selectedKeyToChild, setSelectedKeyToChild] = useState([]);

  useEffect(() => {
    if (selectedKey.length === 4) {
      generateVariant(0, defaultVariant);
      setSelectedKeyToChild(selectedKey);
    } else if(selectedKey.length !== 4 && selectedKey.length !== 0){
        showAlertMessage('Thiếu thông tin để tạo biến thể','Vui lòng chọn đủ 4 thuộc tính Ram, Cpu, Ổ cứng, màu sắc')
    }
  }, [selectedKey]);

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
    serialNumberList: []
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
  }, [VGAChecked]);

  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      heDieuHanh: heDieuHanhChecked
    }));
  }, [heDieuHanhChecked]);

  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      webcam: webcamChecked
    }));
  }, [webcamChecked]);
  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      manHinh: manHinhChecked
    }));
  }, [manHinhChecked]);
  useEffect(() => {
    setDefaultVariant((prev) => ({
      ...prev,
      banPhim: banPhimChecked
    }));
  }, [banPhimChecked]);

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
                  <TextField {...params} id="nameProduct" label="Tên sản phẩm" variant="outlined" color="secondary" />
                )}
              />

              <TextField
                id="codeProduct"
                label="Mã sản phẩm"
                variant="outlined"
                color="secondary"
                sx={{ width: '30%' }}
                placeholder="Nhập mã hoặc mã tự sinh"
              />
            </div>
            <div>
              <TextField id="descriptionProduct" label="Mô tả sản phẩm" multiline rows={4} variant="outlined" fullWidth color="secondary" />
            </div>
          </div>
          <div>
            <SelectDropOneValue list={thuongHieu} setValueSelect={setThuongHieuChecked} name={'Thương hiệu'} />
            <SelectDropOneValue list={nhuCau} setValueSelect={setNhuCauChecked} name={'Nhu cầu'} />
            <SelectDropOneValue list={VGA} setValueSelect={setVGAChecked} name={'VGA'} />
            <SelectDropOneValue list={webcam} setValueSelect={setWebcamChecked} name={'Webcam'} />
            <SelectDropOneValue list={manHinh} setValueSelect={setManHinhChecked} name={'Màn hình'} />
            <SelectDropOneValue list={banPhim} setValueSelect={setBanPhimChecked} name={'Bàn phím'} />
            <SelectDropOneValue list={heDieuHanh} setValueSelect={setHeDieuHanhChecked} name={'Hệ điều hành'} />
          </div>
        </div>

        <div style={{ padding: '10px' }}>
          <h3>Chọn các thuộc tính</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <SelectDropdownForAdd list={ram} setListChecked={setRamChecked} nameDropDown={'Ram'} />
            <SelectDropdownForAdd list={CPU} setListChecked={setCPUChecked} nameDropDown={'CPU'} />
            <SelectDropdownForAdd list={oCung} setListChecked={setOCungChecked} nameDropDown={'Ổ cứng'} />
            <SelectDropdownForAdd list={mauSac} setListChecked={setmauSacChecked} nameDropDown={'Màu sắc'} />
            <Button variant="contained" onClick={checkAttributeSelected} color="secondary" sx={{ height: '60px', borderRadius: '7px' }}>
              <IconCheck />
            </Button>
          </div>
        </div>
        
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
              showMessage={showAlertMessage}
              setResult={setResultVariant}
            />
          )}
        </div>
        <div>
          <AlertDialogSlide title={title} message={message} open={open} setOpen={setOpen} />
        </div>
      </MainCard>
    </>
  );
};

export default ThemSanPham;
