import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, Chip, TextField, Switch, Button } from '@mui/material';

const ListVariant = ({ listKeySort, variantList, setVariantList, showMessage }) => {

    const [variantListTemp, setVariantListTemp] = useState([]);
    useEffect(() => {
        setVariantListTemp([...variantList]);
    }, [variantList])
    useEffect(() => {
        console.log('variantListTemp:', variantListTemp)
    }, [variantListTemp])


    const handleChangeSwitch = (index) => (e) => {
        console.log('run hàm: ', e.target.checked)
        console.log('index: ', index)
        let status = 0;
        if (e.target.checked) {
            status = 1
        }
        const updateVariantTemp = variantListTemp.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    trangThai: status
                }
            }
            return item;
        })

        setVariantListTemp(updateVariantTemp);
    }

    const handleTextFiled = (index) => (event) => {
        const updateVariantTemp = variantListTemp.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    giaBan: event.target.value
                }
            }
            return item;
        })

        setVariantListTemp(updateVariantTemp);
    }

    const handleDeleteItem = (index) => {
        console.log('run hàm: ')
        console.log('index: ', index)
    }

    const handleComfirm = () => {
        if (validateForm()) {
            showMessage("Thành công", "Tạm thế đã")
        } else {
            showMessage("Dữ liệu không hợp lệ", "Vui lòng kiểm tra lại")
        }

    }

    const validateForm = () => {
        let check = true;
        variantListTemp.forEach(item => {
            if (item.giaBan === '' || isNaN(item.giaBan) || parseFloat(item.giaBan) <= 0) {
                check = false;
            }
        })
        return check;
    }

    return (
        <>
            <h3>Nhập thông tin biến thể</h3>
            <Paper>
                {variantListTemp.map((item, index) => (
                    <div key={index} >
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0', padding: '7px' }}>
                            <div style={{ display: 'flex', width: '70%' }}>
                                <div style={{ width: '10%', textAlign: 'center' }}>
                                    <h3>{index + 1}</h3>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', width: '90%' }}>
                                    {item.RAM != null && (<Chip sx={{ margin: '2px' }} label={item.RAM.ten} color="primary" />)}
                                    {item.CPU != null && (<Chip sx={{ margin: '2px' }} label={item.CPU.ten} color="primary" />)}
                                    {item.oCung != null && (<Chip sx={{ margin: '2px' }} label={item.oCung.ten} color="primary" />)}
                                    {item.mauSac != null && (<Chip sx={{ margin: '2px' }} label={item.mauSac.ten} color="primary" />)}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', width: '30%' }}>
                                <div style={{ width: '50%' }}>
                                    <TextField id="outlined-basic" onChange={handleTextFiled(index)} label="Giá bán" variant="outlined" />
                                </div>
                                <div style={{ width: '25%' }}>
                                    <Switch onChange={handleChangeSwitch(index)} defaultChecked />
                                </div>
                                <div style={{ width: '25%' }}>
                                    <DeleteIcon onClick={() => handleDeleteItem(index)} sx={{ color: 'red' }} fontSize='large' />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div style={{margin: '20px 0', display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" onClick={handleComfirm}>Tạo biến thể</Button>
                </div>
            </Paper>
        </>
    );
}

export default ListVariant;