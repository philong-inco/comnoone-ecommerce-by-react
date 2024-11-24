import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, InputAdornment } from '@mui/material';
import AddThuongHieu from '../../../pages/sanpham/thuonghieu/components/CreateQuickly';
import AddNhuCau from '../../../pages/sanpham/nhucau/components/CreateQuickly';
import AddVGA from '../../../pages/sanpham/vga/components/CreateQuickly';
import AddWebcam from '../../../pages/sanpham/webcam/components/CreateQuickly';
import AddManHinh from '../../../pages/sanpham/manhinh/components/CreateQuickly';
import AddBanPhim from '../../../pages/sanpham/banphim/components/CreateQuickly';
import AddHeDieuHanh from '../../../pages/sanpham/hedieuhanh/components/CreateQuickly';
import AddRam from '../../../pages/sanpham/ram/components/CreateQuickly';
import AddCPU from '../../../pages/sanpham/cpu/components/CreateQuickly';
import AddMauSac from '../../../pages/sanpham/mausac/components/CreateQuickly';
import AddOCung from '../../../pages/sanpham/ocung/components/CreateQuickly';


const SelectDropOneValue = ({ list, setValueSelect, name, fetchAgain }) => {
  const [value, setValue] = useState({});
  const [hienThi, setHienThi] = useState({
    thuongHieu: false,
    nhuCau: false,
    vga: false,
    webcam: false,
    manHinh: false,
    banPhim: false,
    heDieuHanh: false,
    ram: false,
    cpu: false,
    oCung: false,
    mauSac: false
  })
  useEffect(() => {
    setValueSelect(value.id);
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAddQuickly = () => {
    if(name === 'Thương hiệu'){
      setHienThi(prev => ({...prev, thuongHieu: true}))
    }
    if(name === 'Nhu cầu'){
      setHienThi(prev => ({...prev, nhuCau: true}))
    }
    if(name === 'VGA'){
      setHienThi(prev => ({...prev, vga: true}))
    }
    if(name === 'Webcam'){
      setHienThi(prev => ({...prev, webcam: true}))
    }
    if(name === 'Màn hình'){
      setHienThi(prev => ({...prev, manHinh: true}))
    }
    if(name === 'Bàn phím'){
      setHienThi(prev => ({...prev, banPhim: true}))
    }
    if(name === 'Hệ điều hành'){
      setHienThi(prev => ({...prev, heDieuHanh: true}))
    }
    if(name === 'RAM'){
      setHienThi(prev => ({...prev, ram: true}))
    }
    if(name === 'CPU'){
      setHienThi(prev => ({...prev, cpu: true}))
    }
    if(name === 'Ổ cứng'){
      setHienThi(prev => ({...prev, oCung: true}))
    }
    if(name === 'Màu sắc'){
      setHienThi(prev => ({...prev, mauSac: true}))
    }
  }

  return (
    <FormControl required sx={{ m: 1, width: '23.4%' }}>
      <InputLabel id="demo-simple-select-required-label" color='secondary'>{name}</InputLabel>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        color='secondary'
        value={value}
        label={name}
        onChange={handleChange}
        sx={{ minHeight: '62.9px' }}
        renderValue={(item) => Object.keys(item).length > 0 ?
          <Chip sx={{ backgroundColor: '#EDE7F6' }} key={item.id} label={item.ten}></Chip>
          : null}
        endAdornment={<InputAdornment style={{ marginRight: "10px" }} position="end">
          <IconButton onClick={()=>handleAddQuickly()}>
            <AddIcon />
          </IconButton>
          {hienThi.thuongHieu == true && <AddThuongHieu fetchRams={fetchAgain} setHide={setHienThi}></AddThuongHieu>}
          {hienThi.nhuCau == true && <AddNhuCau fetchRams={fetchAgain} setHide={setHienThi}></AddNhuCau>}
          {hienThi.vga == true && <AddVGA fetchRams={fetchAgain} setHide={setHienThi}></AddVGA>}
          {hienThi.webcam == true && <AddWebcam fetchRams={fetchAgain} setHide={setHienThi}></AddWebcam>}
          {hienThi.manHinh == true && <AddManHinh fetchRams={fetchAgain} setHide={setHienThi}></AddManHinh>}
          {hienThi.banPhim == true && <AddBanPhim fetchRams={fetchAgain} setHide={setHienThi}></AddBanPhim>}
          {hienThi.heDieuHanh == true && <AddHeDieuHanh fetchRams={fetchAgain} setHide={setHienThi}></AddHeDieuHanh>}
          
          {hienThi.ram == true && <AddRam fetchRams={fetchAgain} setHide={setHienThi}></AddRam>}
          {hienThi.cpu == true && <AddCPU fetchRams={fetchAgain} setHide={setHienThi}></AddCPU>}
          {hienThi.oCung == true && <AddOCung fetchRams={fetchAgain} setHide={setHienThi}></AddOCung>}
          {hienThi.mauSac == true && <AddMauSac fetchRams={fetchAgain} setHide={setHienThi}></AddMauSac>}
        </InputAdornment>}
      >
        {list.map((item) => (
          <MenuItem key={item.id} value={item}>
            {item.ten}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropOneValue;
