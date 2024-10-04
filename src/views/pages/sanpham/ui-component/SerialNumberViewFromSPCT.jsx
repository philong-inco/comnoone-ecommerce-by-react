import * as React from 'react';
import axios from 'axios';
import { IconCirclePlus } from '@tabler/icons-react';
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
import { width } from '@mui/system';

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
    axios.delete(`http://localhost:8080/api/serial-number/delete/${id}`);
    let removeSeriListNew = listSeriTemp.filter(x => x.id != id);
    setListSeriTemp(removeSeriListNew);
    const dataSpctAfter = await axios.get(`http://localhost:8080/api/san-pham-chi-tiet/get-by-product-id?idProduct=${idSP}`);
    console.log('dataSpctAfter: ', dataSpctAfter);
    setListSPCT(dataSpctAfter.data.data);
  }

  const handleWriteSerial = (e) => {
    console.log('e.target.value: ', e.target.value);
    const val = e.target.value;
    setAddSeriStr(e.target.value);
  }

  const handleAddSeri = async () => {
    console.log('addSeriStr: ', addSeriStr); 
    const seriConverted = addSeriStr.split(',');
    console.log('seriConverted: ', seriConverted);
    let seriDuplicated = "";
    let isDulicate = false;
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
                <TableBody>
                {listSeriTemp.map((row, index) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell sx={{fontWeight: '800', color: '#673AB7'}} align="left">{row.ma}</TableCell>
                    <TableCell align="left">{format(new Date(row.ngayNhap), 'dd-MM-yyyy HH:mm:ss')}</TableCell>
                    {row.trangThai == 0 && <TableCell align="left"><Chip label="Chưa bán" size='small' sx={{ backgroundColor: '#88C4F5' }} /></TableCell>}
                    {row.trangThai == 1 && <TableCell align="left"><Chip label="Đã bán" size='small' sx={{ backgroundColor: '#EDE7F6' }} /></TableCell>}
                    {row.trangThai == 0 && <TableCell align="left"><IconTrash stroke={2} onClick={() => {removeSeri(row.id)}} /></TableCell>}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '70%'}}>
                <DialogContentText id="alert-dialog-slide-description">
                <p>Thêm serial: </p>
                <br /><br />
                <TextField fullWidth rows={5} onChange={handleWriteSerial} id="serial" label="Thêm serial number cho biến thể này" multiline maxRows={5} />
                    </DialogContentText>
                </div>
            </div>
            <div  style={{width: '25%'}}>
                <IconCirclePlus stroke={2} onClick={handleAddSeri}/>
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