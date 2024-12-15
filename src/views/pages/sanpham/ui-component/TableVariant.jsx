import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Switch, Button } from '@mui/material';
import { IconUpload } from '@tabler/icons-react';
import { IconCirclePlus, IconCheck } from '@tabler/icons-react';
import { color } from 'framer-motion';
import ImportSerialForm from './ImportSerialForm.jsx';
import AlbumImage from './AlbumImage.jsx';
import axios from 'axios';
// import InputSetPriceAll from './InputSetPriceAll.jsx';
import ListVariant from './ListVariant.jsx';
import { margin } from '@mui/system';
import { element } from 'prop-types';
import { IconTrash } from '@tabler/icons-react';
import { backEndUrl } from '../../../../utils/back-end.js';
import { useNavigate } from 'react-router-dom';
import {get, post, put, del } from '../../../../utils/requestSanPham';
import AlertComNoOne from './AlertComNoOne.jsx';
const TableVariant = ({ listKeySort, variantListFromParent, setProductVarriant, showMessage, setResult, actionFather, listAnh, mauSacChecked }) => {
  //Thông báo
  const [comNoti, setComNoti] = useState({
    message: '', isOpen: false, count: 0
  })
  const alert = (message) => {
    setComNoti(prev => ({...prev, message: message, isOpen: true, count: (comNoti.count + 1)}))
  }
  //Thông báo
  const [variantList, setVariantList] = useState([]);
  const navigate = useNavigate();
  const combinedKey = (index, variant) => {
    let result = '';
    for (let i = index; i >= 0; i--) {
      result += variant[listKeySort[i]].ten;
    }
    return result;
  };
  const counts = {};
  const firstOccurrences = {};
  variantList.forEach((variant, indexVariant) => {
    listKeySort.forEach((key, index) => {
      const attributeValue = combinedKey(index, variant);
      const countKey = `${attributeValue}`;
      if (counts[countKey] === undefined) {
        counts[countKey] = 0;
      }
      counts[countKey]++;
      // console.log('cou:', counts[countKey])

      if (firstOccurrences[countKey] === undefined) {
        firstOccurrences[countKey] = indexVariant;
        // console.log('key:', countKey, '| index:', indexVariant);
      }
    });
  });

  // set giá chung
  const [priceAll, setPriceAll] = useState('');

  const handlePriceAll = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPriceAll(value);
  };
  const changePriceAll = () => {
    debugger
    console.log('priceAll: ', priceAll);
    if (confirm('Xác nhận thay đổi toàn bộ giá bán thành: '+ priceAll)) {
      const newVariantMap = variantList.map((varian) => ({
        ...varian,
        giaBan: priceAll
      }));
      setVariantList(newVariantMap);
    }
  };

  // Ảnh san pham
  const [imageList, setImageList] = useState([]);
  const [openAlbum, setOpenAlbum] = useState(false);
  const handleOpenAlbum = () => setOpenAlbum(true);
  // Ảnh san pham

  useEffect(() => {
    console.log('imageList: ', imageList);
  }, [imageList]);

  // biến lưu id album ảnh được hiện
  const [idAlbumImageVisiable, setAlbumImageVisiable] = useState(null);
  const handleShowAlbumImage = (id) => {
    setAlbumImageVisiable(id);
  };

  // mac sac checked
  const [mauSacCheckedSelectAnh, setMauSacCheckedSelectAnh] = useState([]);
  useEffect(() => {
    console.log('mauSacCheckedSelectAnhcha: ', mauSacCheckedSelectAnh);
  }, [mauSacCheckedSelectAnh]);

  const onUpdateImage = (id, arr) => {
    let newMauSacSelect = mauSacCheckedSelectAnh.map((element) => {
      if (element.id === id) {
        return { ...element, urls: arr };
      }
      return element;
    });
    setMauSacCheckedSelectAnh(newMauSacSelect);
  };
  useEffect(() => {
    const elementConvert = mauSacChecked.map((x) => ({
      id: x.id,
      ten: x.ten,
      urls: []
    }));
    setMauSacCheckedSelectAnh(elementConvert);
  }, [mauSacChecked]);

  const fetchMauSacAfterDelete = () => {
    const variantMau = [];
    for(let i = 0; i < variantList.length; i++){
      if (!variantMau.includes(variantList[i].mauSac.id)){
        variantMau.push(variantList[i].mauSac.id);
      }
    }
    console.log('mauSacCheckedSelectAnh1111: ', mauSacCheckedSelectAnh); 
    console.log('variantMau: ', variantMau);
    const temp = mauSacCheckedSelectAnh.filter(x => variantMau.includes(x.id));
    console.log('temp: ', temp);
    setMauSacCheckedSelectAnh(temp);
  }


  // mac sac checked

  // set giá chung

  useEffect(() => {
    setVariantList([]);
    setVariantList([...variantListFromParent]);
  }, [variantListFromParent]);

  useEffect(() => {
    setImageList([...listAnh]);
  }, [listAnh]);

  useEffect(() => {
    console.log('variantList:', variantList);
  }, [variantList]);

  const handleDeleteBT = (index) => {
    if (confirm("Xác nhận xóa")){
      variantList.splice(index, 1);
      setProductVarriant(variantList);
      fetchMauSacAfterDelete();
    }
    
  }

  const handleGiaBan = (index) => (e) => {
    const value = e.target.value.replace(/\D/g, '');

    const updateVariant = variantList.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          giaBan: value
        };
      }
      return item;
    });

    setVariantList(updateVariant);
  };

  const handleChangeSwitch = (index) => (e) => {
    let status = 0;
    if (e.target.checked) {
      status = 1;
    }
    const updateVariant = variantList.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          trangThai: status
        };
      }
      return item;
    });

    setVariantList(updateVariant);
  };

  const [openFormSerial, setOpenFormSerial] = useState(false);
  const [serialsTemp, setSerialsTemp] = useState({ index: -1, value: '' });

  useEffect(() => {
    console.log(serialsTemp);
  }, [serialsTemp]);

  const handleUploadSerial = (index) => {
    // console.log('index: ', index);
    // console.log('variantList[index]: ', variantList[index]);
    // console.log('variantList[index].serialNumberList: ', variantList[index].serialNumberList);
    // console.log('SR:', variantList[index].serialNumberList.join(','));
    setSerialsTemp((prev) => ({
      index: index,
      value: variantList[index].serialNumberList.join(',')
    }));
    // console.log(serialsTemp);
    setOpenFormSerial(true);
  };

  //   const [priceAll, setPriceAll] = useState('');
  //   const [openPriceAll, setOpentPriceAll] = useState(false);
  //   useEffect(() => {
  //     const updateVariant = variantList.map((item) => {
  //       return {
  //         ...item,
  //         giaBan: priceAll
  //       };
  //     });
  //     setVariantList(updateVariant);
  //   }, [priceAll]);
  //   const handleDatGiaChung = () => {
  //     setOpentPriceAll(true);
  //   };

  // thay đổi serial number từng hàng
  const setSerialFromChild = async (obj) => {
    const listSerialExist = [];

    async function isUniqueSerial(serial) {
      let isExistSeri = null; // chưa tồn tại API trả về false
      try {
        isExistSeri = await get(`/serial-number/exist-for-add?ma=${serial}`);
      } catch (error) {
        if (error.status == 403){
          alert("Không đủ quyền thực hiện chức năng này")
       }
       if (error.status == 401){
          navigate(`/login`);
       }
        if (error.response) {
          isExistSeri = error.response.data;
        }
      }
      console.log(isExistSeri.data);
      if (isExistSeri.data.data) {
        listSerialExist.push(serial);
        console.log('listSerialExist: ', listSerialExist);
        return true;
      }
      return false;
    }

    // console.log('Cha nhận: ', obj);
    let newSerial = obj.value.split(',').map((serial) => serial.trim());
    if (newSerial.length === 1 && newSerial[0] === '') {
      newSerial = [];
    }

    const serialValidate = [];
    console.log('ListValid before: ', serialValidate);
    const listInValidLength = [];
    const regex = /^[a-zA-Z0-9-]+$/;
    for (const serial of newSerial) {
      if (serial.length < 7 || serial.length > 20) {
        listInValidLength.push(serial);
      } else if (!regex.test(serial)) {
        listInValidLength.push(serial);
      }
    }
    if (listInValidLength.length > 0) {
      alert('Serial phải từ 7-20 ký tự chữ số, các serial sau không hợp lệ: ' + listInValidLength.join(','));
      return;
    }
    for (const serial of newSerial) {
      const check = await isUniqueSerial(serial); // Đợi kết quả từ isUniqueSerial
      console.log('Kết quả hàm: ', check); // Hiển thị kết quả trực tiếp
      if (check == false) {
        console.log('vào nè');
        serialValidate.push(serial);
      }
    }

    console.log('ListValid after: ', serialValidate);

    const updateVariant = variantList.map((item, idx) => {
      if (idx === obj.index) {
        return {
          ...item,
          serialNumberList: serialValidate
        };
      }
      return item;
    });

    if (listSerialExist.length > 0) {
      alert('Đã loại bỏ các serial đã tồn tại sau', 'Danh sách: ' + listSerialExist.join(','));
    }

    setVariantList(updateVariant);
  };

  const handleSetResult = () => {
    const check = validateForm();
    console.log('check: ', check);
    if (check.check) {
      setResult(variantList);
      actionFather();
    } else {
      let noti = '';
      if (check.message !== '') {
        noti += 'Giá không hợp lệ tại dòng ' + check.message;
        noti = noti.substring(0, noti.length - 2);
      }

      if (check.isDulicateSeri) {
        noti += '\n | Serial Number nhập trong danh sách bị trùng lặp.';
      }
      alert(noti);
    }
  };

  const validateForm = () => {
    console.log('run validate');
    let check = {
      check: true,
      message: '',
      seriVuaNhap: [],
      isDulicateSeri: false
    };
    let seriVuaNhap = [];
    variantList.forEach((item, idx) => {
      // set mảng ảnh theo màu
      mauSacCheckedSelectAnh.forEach((color) => {
        if (item.mauSac.id === color.id) {
          item.anhSanPham = color.urls;
        }
      });
      // check giá
      if (item.giaBan === '' || isNaN(item.giaBan) || parseFloat(item.giaBan) <= 0 || parseFloat(item.giaBan) > 500000000) {
        check.check = false;
        check.message += idx + 1 + ', ';
      }
      if (Array.isArray(item.serialNumberList)) {
        console.log('...item.serialNumberList: ', item.serialNumberList);
      } else {
        console.log('k phải array');
      }

      seriVuaNhap = [...seriVuaNhap, ...item.serialNumberList];
      // console.log('seriVuaNhap trong for: ',seriVuaNhap)
    });
    console.log('seriVuaNhap ', seriVuaNhap);
    if (new Set(seriVuaNhap).size != seriVuaNhap.length) {
      check.check = false;
      check.isDulicateSeri = true;
    }

    return check;
  };

  function formatCurrency(amount, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      currency: currency
    }).format(amount);
  }

  //   listKeySort.forEach((key) => {
  //     firstOccurrences[key] = {};
  //     variantList.forEach((variant, index) => {
  //       const attributeValue = combinedKey(index, variant); // corei5
  //       const countKey = `${key}:${attributeValue}`; // cpu:corei5
  //       //   console.log('counts[countKey]:', counts[countKey])
  //       //   console.log('firstOccurrences[key][attributeValue] === undefined:', firstOccurrences[key][attributeValue] === undefined)
  //       if (counts[countKey] && firstOccurrences[key][attributeValue] === undefined) {
  //         firstOccurrences[key][attributeValue] = index;
  //         // console.log('firstOccurrences:', firstOccurrences[key]);
  //       }
  //     });
  //   });

  /**
   * firstOccurrences:
   * {
   *    Ram: {
   *            Ram4gb: 1
   *         },
   *    CPU: {
   *            Corei3: 0
   *            Corei5: 1
   *         }
   * }
   */

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <TextField
          label="Nhập giá chung"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          value={formatCurrency(priceAll)}
          onChange={handlePriceAll}
        />
        <Button
          onClick={changePriceAll}
          variant="contained"
          color="secondary"
          sx={{ height: '47px', borderRadius: '7px', marginTop: '10px' }}
        >
          <IconCheck />
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              {listKeySort.map(
                (key) =>
                  (key === 'RAM' && <TableCell key="ram">Ram</TableCell>) ||
                  (key === 'CPU' && <TableCell key="cpu">Cpu</TableCell>) ||
                  (key === 'oCung' && <TableCell key="oCung">Ổ cứng</TableCell>) ||
                  (key === 'mauSac' && <TableCell key="mauSac">Màu sắc</TableCell>)
              )}
              <TableCell>Số lượng</TableCell>
              <TableCell>
                Giá bán
                {/* <Button
                  onClick={handleDatGiaChung}
                  sx={{ backgroundColor: '#EDE7F6', borderRadius: '7px', marginLeft: '5px' }}
                  size="small"
                  color="secondary"
                >
                  Đặt giá chung
                </Button> */}
              </TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variantList.map((variant, rowIndex) => (
              <>
                <TableRow key={rowIndex}>
                  <TableCell>{rowIndex + 1}</TableCell>
                  {listKeySort.map((key, index) => {
                    const attributeValue = combinedKey(index, variant);
                    const countKey = `${attributeValue}`;
                    if (firstOccurrences[countKey] === rowIndex) {
                      return (
                        <TableCell key={key} rowSpan={counts[countKey]}>
                          {variant[listKeySort[index]].ten}
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                  <TableCell>{variant.serialNumberList.length}</TableCell>
                  <TableCell>
                    <TextField
                      value={formatCurrency(variant.giaBan)}
                      onChange={handleGiaBan(rowIndex)}
                      label="Giá bán"
                      variant="standard"
                      fullWidth
                      color="secondary"
                    />
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconUpload
                        onClick={() => handleUploadSerial(rowIndex)}
                        style={{
                          color: '#2195F2',
                          fontSize: '20px',
                          backgroundColor: '#bbedfc',
                          borderRadius: '7px',
                          padding: '5px',
                          cursor: 'pointer'
                        }}
                      />
                      <Switch onChange={handleChangeSwitch(rowIndex)} defaultChecked={variant.trangThai === 1} color="secondary" />
                    </div>
                  </TableCell>
                  <TableCell sx={{color:"#EF4444"}}>
                    <IconTrash stroke={2} onClick={() => {handleDeleteBT(rowIndex)}}/>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: '20px', margin: '50px 0 20px 0', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bolder', marginBottom: '20px' }}>Chọn ảnh theo màu sắc</h3>
      </div>
      {mauSacCheckedSelectAnh.map((element) => (
        <div key={element.id} style={{ display: 'flex', margin: '10px 0', minHeight: '115px' }}>
          <div style={{ width: '30%' }}>
            <Button color="secondary" variant="outlined" onClick={() => handleShowAlbumImage(element.id)}>
              Màu {element.ten}
            </Button>
            {idAlbumImageVisiable === element.id && (
              <AlbumImage
                key={element.id}
                openAlbum={openAlbum}
                setOpenAlbum={handleShowAlbumImage}
                listAnh={imageList}
                nameColor={element.ten}
                idColor={element.id}
                onUpdateImage={onUpdateImage}
              />
            )}
          </div>
          <div style={{ width: '70%', display: 'flex' }}>
            {element.urls.map((url) => (
              <div style={{ width: '100px', margin: '5px' }}>
                <img src={url} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Anh sp */}
      {/* <div style={{margin: "10px 0", textAlign: "center"}}>
      <Button variant="outlined" onClick={handleOpenAlbum}>
        Chọn ảnh
      </Button>
        <AlbumImage 
          openAlbum={openAlbum}
          setOpenAlbum={setOpenAlbum}
          listAnh={imageList} 
          />
      </div> */}
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <Button
          title="Xác nhận"
          variant="contained"
          color="secondary"
          sx={{ height: '47px', borderRadius: '7px', marginTop: '10px' }}
          onClick={handleSetResult}
        >
          Xác nhận
        </Button>
      </div>

      <div>
        <ImportSerialForm
          open={openFormSerial}
          setOpen={setOpenFormSerial}
          title={'Nhập serial number cho biến thể'}
          message={'Hãy phân cách các serial bằng dấu phẩy (,)'}
          serialNumbers={serialsTemp}
          setSerialNumbers={setSerialFromChild}
        />
        {/* <InputSetPriceAll
          title={'Nhập giá chung cho biến thể'}
          message={'Giá này sẽ áp dụng cho toàn bộ biến thể, có thể sửa lại sau'}
          open={openPriceAll}
          setOpen={setOpentPriceAll}
          setPriceAll={setPriceAll}
        /> */}
      </div>
      <AlertComNoOne
        message={comNoti.message}
        isOpen={comNoti.isOpen}
        count={comNoti.count}
      ></AlertComNoOne>
    </div>
    // <div>

    //     <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
    //   <thead>
    //     <tr>
    //       {listKeySort.map(key => (
    //         <th key={key}>{key}</th>
    //       ))}
    //       {/* <th>Price</th> */}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {variantList.map((variant, rowIndex) => (
    //       <tr key={rowIndex}>
    //         {listKeySort.map(key => {
    //           const attributeValue = variant[key].ten;
    //           const countKey = `${key}:${attributeValue}`;
    //           if (firstOccurrences[key][attributeValue] === rowIndex) {
    //             return (
    //               <td key={key} rowSpan={counts[countKey]}>
    //                 {attributeValue}
    //               </td>
    //             );
    //           }
    //           return null;
    //         })}
    //         {/* <td>
    //           <input type="text" placeholder="Price" />
    //         </td> */}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    // </div>
  );
};

export default TableVariant;
