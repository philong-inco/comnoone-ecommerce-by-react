import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Box, OutlinedInput, InputLabel, Chip, InputAdornment, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import AddRam from '../../../pages/sanpham/ram/components/CreateQuickly';
import AddCPU from '../../../pages/sanpham/cpu/components/CreateQuickly';
import AddMauSac from '../../../pages/sanpham/mausac/components/CreateQuickly';
import AddOCung from '../../../pages/sanpham/ocung/components/CreateQuickly';

const SelectDropdownForAdd = ({ list, setListChecked, nameDropDown, fetchAgain }) => {
    // SELECT DROPDOWN
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 150,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const [selectId, setSelectId] = useState([]);
    const [selectName, setSelectName] = useState([]);
    const [selectItemss, setselectItemss] = useState([]);
    // useEffect(() => {
    //     if (selectId) {
    //         console.log('ID: ', selectId)
    //     }
    // }, [selectId]);
    // useEffect(() => {
    //     if (selectName) {
    //         console.log('name: ', selectName)
    //     }
    // }, [selectName]);

    useEffect(() => {
        const element = selectItemss.map((item) => item);
        setListChecked(element);
        setSelectName(selectItemss.map((item) => item.ten));
    }, [selectItemss]);


    const handleChange = (event) => {
        const { value } = event.target;
        setselectItemss(value);
    };
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

      const handleAddQuickly = () => {
        if(nameDropDown === 'Thương hiệu'){
          setHienThi(prev => ({...prev, thuongHieu: true}))
        }
        if(nameDropDown === 'Nhu cầu'){
          setHienThi(prev => ({...prev, nhuCau: true}))
        }
        if(nameDropDown === 'VGA'){
          setHienThi(prev => ({...prev, vga: true}))
        }
        if(nameDropDown === 'Webcam'){
          setHienThi(prev => ({...prev, webcam: true}))
        }
        if(nameDropDown === 'Màn hình'){
          setHienThi(prev => ({...prev, manHinh: true}))
        }
        if(nameDropDown === 'Bàn phím'){
          setHienThi(prev => ({...prev, banPhim: true}))
        }
        if(nameDropDown === 'Hệ điều hành'){
          setHienThi(prev => ({...prev, heDieuHanh: true}))
        }
        if(nameDropDown === 'RAM'){
          setHienThi(prev => ({...prev, ram: true}))
        }
        if(nameDropDown === 'CPU'){
          setHienThi(prev => ({...prev, cpu: true}))
        }
        if(nameDropDown === 'Ổ cứng'){
          setHienThi(prev => ({...prev, oCung: true}))
        }
        if(nameDropDown === 'Màu sắc'){
          setHienThi(prev => ({...prev, mauSac: true}))
        }
      }

    return (
        <div>
            <FormControl sx={{ width: 220 }}>
                <InputLabel id="demo-multiple-chip-label" color='secondary'>{nameDropDown}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    color='secondary'
                    multiple
                    sx={{minHeight: '62.9px'}}
                    value={selectItemss}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((item) => (
                                <Chip key={item.id} label={item.ten} sx={{backgroundColor: '#EDE7F6'}}/>
                            ))}
                        </Box>
                    )}
                    endAdornment={
                        <InputAdornment style={{marginRight: "10px"}} position="end">
                          <IconButton  onClick={()=>handleAddQuickly()}>
                            <AddIcon />
                          </IconButton>
                            {hienThi.ram == true && <AddRam fetchRams={fetchAgain} setHide={setHienThi}></AddRam>}
                            {hienThi.cpu == true && <AddCPU fetchRams={fetchAgain} setHide={setHienThi}></AddCPU>}
                            {hienThi.oCung == true && <AddOCung fetchRams={fetchAgain} setHide={setHienThi}></AddOCung>}
                            {hienThi.mauSac == true && <AddMauSac fetchRams={fetchAgain} setHide={setHienThi}></AddMauSac>}
                        </InputAdornment>
                      }
                        
                    MenuProps={MenuProps}
                >
                    {list.map((element) => (
                        <MenuItem
                            key={element.id}
                            value={element}
                            style={getStyles(element.ten, selectItemss.map(item => item.ten), theme)}
                        >
                            {element.ten}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectDropdownForAdd;