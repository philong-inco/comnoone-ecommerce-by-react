import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import UploadWidget from 'ui-component/cloudinary/UploadWidget.jsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { backEndUrl } from '../../../../utils/back-end';
import { useNavigate } from 'react-router-dom';
import {get, post, put, del } from '../../../../utils/requestSanPham';
import AlertComNoOne from './AlertComNoOne';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AlbumImageForUpdateSPCT = ({setOpenAlbum, listCurrent, setVariant}) => {
  //Thông báo
  const [comNoti, setComNoti] = useState({
    message: '', isOpen: false, count: 0
  })
  const alert = (message) => {
    setComNoti(prev => ({...prev, message: message, isOpen: true, count: (comNoti.count + 1)}))
  }
  //Thông báo
  const navigate = useNavigate();

    const [listAnhTemp, setListAnhTemp] = useState([]);
    useEffect(() => {
        console.log('listAnhTemp: ', listAnhTemp);
    }, [listAnhTemp])
    useEffect(() => {
        loadAllAnh();
    }, [])
    useEffect(() => {
      const temp = listCurrent.filter(x => x.trim() != '')
        setImageSelect([...temp]);
    }, [listCurrent])

    const loadAllAnh = async () => {
      try{
        const temp = await get(`/anh-san-pham/list`);
        setListAnhTemp(temp.data.data);
      }catch(error){
         if (error.status == 403){
            alert("Không đủ quyền thực hiện chức năng này")
         }
         if (error.status == 401){
            navigate(`/login`);
         }
      }
       
    }

    // anh selected
    const [imageSelect, setImageSelect] = useState([]);
    const handleSelect = (url) => {
        if (imageSelect.includes(url)) {  
            // Nếu có, lọc URL đó ra khỏi mảng  
            setImageSelect(prev => prev.filter(item => item !== url)); 
        } else {
            if (imageSelect.length < 3){
                setImageSelect(prev => [...imageSelect, url]);
            } else {
                return;
            }
        }
    }
    useEffect(()=> {
        console.log('imageSelect: ', imageSelect); 
    }, [imageSelect])

    const saveSelect = () => {
        setVariant(prev => ({...prev, listUrlAnhSanPham: imageSelect}));
        handleClose();
    }
    
    useEffect(() => {
    }, [listAnhTemp])
  const handleClickOpen = () => {
    setOpenAlbum(true);
  };

  const handleClose = () => {
    setOpenAlbum(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',backgroundColor: '#5F35B1' }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleClose}
              aria-label="close"
              sx={{color: "#FFFFFF"}}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: "#FFFFFF" }} variant="h3" component="div">
              Chọn tối đa 3 ảnh
            </Typography>
            <Button title="Lưu" autoFocus color="inherit" onClick={saveSelect} >
                <IconDeviceFloppy stroke={2}/>
            </Button>
            <UploadWidget
            setUrlImages={setListAnhTemp}
            />
          </Toolbar>
        </AppBar>
        <div style={{padding: " 20px"}}>
            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
            {listAnhTemp.map((url, idx) => {
                return (
                    <div key={idx} style={{width: "16%", position: "relative"}}>
                        {imageSelect.includes(url) && (<IconCircleCheck style={{backgroundColor: "#BBEDFC", color: "#5E35B1", position: "absolute", top: "5px", right: "5px", borderRadius: "7px"}} stroke={2} />)}
                        <img  onClick={() => handleSelect(url)} src={url} style={{width: "100%", cursor: "pointer"}} />
                    </div>
                )
            })
            }
            </div>
        </div>
      </Dialog>
      <AlertComNoOne
        message={comNoti.message}
        isOpen={comNoti.isOpen}
        count={comNoti.count}
      ></AlertComNoOne>
    </React.Fragment>
  );
}

export default AlbumImageForUpdateSPCT;