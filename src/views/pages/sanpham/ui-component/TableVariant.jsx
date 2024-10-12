import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Switch, Button } from '@mui/material';
import { IconUpload } from '@tabler/icons-react';
import { color } from 'framer-motion';
import ImportSerialForm from './ImportSerialForm.jsx';
import axios from 'axios';
// import InputSetPriceAll from './InputSetPriceAll.jsx';
import ListVariant from './ListVariant.jsx';

const TableVariant = ({ listKeySort, variantListFromParent, showMessage, setResult }) => {
  const [variantList, setVariantList] = useState([]);
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

  useEffect(() => {
    setVariantList([]);
    setVariantList([...variantListFromParent]);
  }, [variantListFromParent]);

  useEffect(() => {
    console.log('variantList:', variantList);
    
  }, [variantList]);

  

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
      try{
        isExistSeri = await axios.get(`http://localhost:8080/api/serial-number/exist-for-add?ma=${serial}`);
          
      } catch(error){
        if (error.response)
        {
          isExistSeri = error.response.data;
        }
      }
      console.log(isExistSeri.data);
      if (isExistSeri.data) {
        listSerialExist.push(serial);
        console.log('listSerialExist: ', listSerialExist)
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
      showMessage('Đã loại bỏ các serial đã tồn tại sau', 'Danh sách: ' + listSerialExist.join(','));
    }

    setVariantList(updateVariant);
  };

  const handleSetResult = () => {
    const check = validateForm();
    console.log('check: ', check);
    if (check.check) {
      setResult(variantList);
    } else {
      let noti = '';
      if (check.message !== ''){
        noti += 'Giá không hợp lệ tại dòng ' + check.message
        noti = noti.substring(0, noti.length - 2)
      }
      
      if (check.isDulicateSeri)
      {
        noti += '\n | Serial Number nhập trong danh sách bị trùng lặp.'
      }
      showMessage(noti);
    }
  };

  const validateForm = () => {
    console.log('run validate')
    let check = {
      check: true,
      message: '',
      seriVuaNhap: [],
      isDulicateSeri: false
    };
    let seriVuaNhap = [];
    variantList.forEach((item, idx) => {
      if (item.giaBan === '' || isNaN(item.giaBan) || parseFloat(item.giaBan) <= 0) {
        check.check = false;
        check.message += idx + 1 + ', ';
      }
      if (Array.isArray(item.serialNumberList)){
        console.log('...item.serialNumberList: ', item.serialNumberList)
      } else {
        console.log('k phải array')
      }

      seriVuaNhap = [...seriVuaNhap, ...item.serialNumberList]
      // console.log('seriVuaNhap trong for: ',seriVuaNhap)
    });
    console.log('seriVuaNhap ',seriVuaNhap)
    if (new Set(seriVuaNhap).size != seriVuaNhap.length){
        check.check = false;
        check.isDulicateSeri = true;
    }
    
    return check;
  };

  function formatCurrency(amount, locale = 'vi-VN', currency = 'VND') {
    return new Intl.NumberFormat(locale, {
      style: 'decimal',
      currency: currency,
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
                    <TextField value={formatCurrency(variant.giaBan)} onChange={handleGiaBan(rowIndex)} label="Giá bán" variant="standard" fullWidth color="secondary" />
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
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button color="secondary" onClick={handleSetResult}>
        Xác nhận
      </Button>

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
