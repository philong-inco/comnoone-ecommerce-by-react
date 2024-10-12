import * as React from 'react';
import axios from 'axios';
import { IconCirclePlus, IconCheck } from '@tabler/icons-react';
import Button from '@mui/material/Button';
import { IconTrash } from '@tabler/icons-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';  
import { useState } from 'react';
import { maxHeight, width } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SerialNumberViewFromSPCT({title, list ,open, setOpen, idSP, idSPCT, setListSPCT}) {
  
    const [listSeriTemp, setListSeriTemp] = React.useState([]);
    const [addSeriStr, setAddSeriStr] = React.useState('');

    React.useEffect(() => {
        setListSeriTemp(list);
    }, [list])

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  const removeSeri = async (id) => {
    if (!confirm("Xác nhận xóa?")){
      return;
    }
    await axios.delete(`http://localhost:8080/api/serial-number/delete/${id}`);
    let removeSeriListNew = listSeriTemp.filter(x => x.id != id);
    setListSeriTemp(removeSeriListNew);
    loadDataSpceAfter();
  }

  const loadDataSpceAfter = async () => {
    const dataSpctAfter = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-product-id?idProduct=${idSP}`);
    console.log('dataSpctAfter: ', dataSpctAfter);
    setListSPCT(dataSpctAfter.data.data);
  }

  const loadSeriList = async () => {
    const seriGetAgain = await axios.get(`http://localhost:8080/api/serial-number/find-by-spct-id/${idSPCT}`);
    
    setListSeriTemp(seriGetAgain.data.data);
  }

  const handleWriteSerial = (e) => {
    console.log('e.target.value: ', e.target.value);
    setAddSeriStr(e.target.value);
  }

  const validateSeriLength = (list) => {
    for(let i = 0; i < list.length; i++){
      if (list[i].length < 7 || list[i].length > 20){
        return false;
      }
      const regex = /^[A-Za-z0-9]+$/;
      if(!regex.test(list[i])){
      return false;
      }
    return true;
  }
}

  const handleAddSeri = async () => {
    console.log('addSeriStr: ', addSeriStr);
    const seriConverted = addSeriStr.split(',').filter(x => x.trim() !== '');
    console.log('seriConverted: ', seriConverted);
    let seriDuplicated = "";
    let isDulicate = false;
    let checkValidate = validateSeriLength(seriConverted);
    if (!checkValidate){
      alert("Quy ước SerialNumber cho phép 7-20 ký tự liền nhau và không có ký tự đặc biệt");
      return;
    }
    for (let i = 0; i < seriConverted.length; i++){
        let seri = seriConverted[i];
        const check = await axios.get(`http://localhost:8080/api/serial-number/exist-for-add?ma=${seri}`);
        if (check.data.data){
            seriDuplicated = seriDuplicated  + seri + ', ';
            isDulicate = true;
        }
    }

    
    let setSeri = new Set();
    for (let i = 0; i < seriConverted.length; i++){
        setSeri.add(seriConverted[i].toLowerCase());
    }
    if (setSeri.size != seriConverted.length){
        alert("Seri bị trùng lặp trong danh sách đang nhập");
        return;
    }

    if (isDulicate){
        alert("Seri bị trùng lặp: " + seriDuplicated.substring(0, seriDuplicated.length - 2));
        return;
    } else {
        for (let i = 0; i < seriConverted.length; i++){
            let seriAdd = {
                trangThai: 0,
                ma: seriConverted[i],
                ngayNhap: new Date().toISOString(),
                sanPhamChiTietId: idSPCT
            };
            await axios.post(`http://localhost:8080/api/serial-number/add`, seriAdd);
        }
        alert("Thêm seri thành công");
        loadSeriList();
        loadDataSpceAfter();
    }


    // validate và gọi API get
  }


  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{  
            style: {  
            //   width: '80%', // Thay đổi kích thước tại đây  
              maxWidth: '1200px', // Kích thước tối đa (nếu cần thiết)  
              height: '800px'
            }  
          }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <MainCard>
            <h2>Danh sách serial number:</h2>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell align="left">Serial Number</TableCell>
                    <TableCell align="left">Ngày nhập</TableCell>
                    <TableCell align="left">Trạng thái</TableCell>
                    <TableCell align="left">Hành động</TableCell>
                </TableRow>
                </TableHead>
                
                <TableBody >
                {listSeriTemp.map((row, index) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell sx={{fontWeight: '800', color: '#673AB7'}} align="left" title={`${row.ma.length} ký tự`}>{row.ma}</TableCell>
                    <TableCell align="left">{format(new Date(row.ngayNhap), 'dd-MM-yyyy HH:mm:ss')}</TableCell>
                    {row.trangThai == 0 && <TableCell align="left"><Chip label="Chưa bán" size='small' sx={{ backgroundColor: '#88C4F5' }} /></TableCell>}
                    {row.trangThai == 1 && <TableCell align="left"><Chip label="Đã bán" size='small' sx={{ backgroundColor: '#EDE7F6' }} /></TableCell>}
                    {row.trangThai == 0 && <TableCell align="left" title={`Xóa`}>
                      <Button variant="contained" color='error' onClick={() => {removeSeri(row.id)}}
                          sx={{color: "#FFFFFF", backgroundColor: "#AA0000", marginTop: '10px'}}>
                        <IconTrash stroke={2} />
                      </Button>
                      </TableCell>}
                    </TableRow>
                ))}
                </TableBody>
                
            </Table>
            </TableContainer>
          

            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '80%'}}>
                <DialogContentText id="alert-dialog-slide-description">
                <br /><br />
                <TextField fullWidth rows={5} onChange={handleWriteSerial} id="serial" label="Thêm serial number cho biến thể này" multiline maxRows={5} />
                    </DialogContentText>
                </div>
                <div  style={{width: '25%', margin: "50px 0 0 20px", color: "#FFFFFF"}}>
                <Button onClick={handleAddSeri} variant="contained" color="secondary" sx={{ height: '60px', borderRadius: '7px', marginTop: '10px' }}>
                  <IconCheck /> Thêm
                </Button>
              </div>
            </div>
            
          </MainCard>

        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}