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
import { backEndUrl } from '../../../../utils/back-end';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AlbumImage = ({openAlbum, setOpenAlbum, listAnh, nameColor, idColor, onUpdateImage}) => {

    const [listAnhTemp, setListAnhTemp] = useState([]);
    useEffect(() => {
        setListAnhTemp([...listAnh]);
        // setListAnhTemp([
        //     'https://lh3.googleusercontent.com/tr8DIerJp1-zRdtNUUyJu9ObXSsiqbB2C3UYVIMIkTIGHycwEcec9LO4swOAaJGugnNi-lM_0gwugxTWeYDNsVVN6JMNAz0b=w230-rw',
        //     'https://lh3.googleusercontent.com/H0ovo5ge_Dy8YVpZkMX6j7Fwu6evEnmfVlS-ICGAKsVIdoCAkI71vUq7vgSGvi2TjvE69QuhMuXecql4uuYzlCizHP2MsYI=w230-rw',
        //     'https://lh3.googleusercontent.com/ZOHNa_ZSMdhAZoGPUdkc_aptrAb7dO0gD50NvhjoPoN4drnzfarq6X9AzUVGfyPeSVdbzAhTMA01MVInJL8cedVW47iKhag6=w230-rw',
        //     'https://lh3.googleusercontent.com/Y8Hy7lT_W1Ct95fLlYMt9Vj1lXI-gR3yRmYiE3lUgWnzCzciU8bNzvei6qRu36_z0TPcmW46NvPgSbDCKfw8hLTVUTR8CC6E=w230-rw',
        //     'https://lh3.googleusercontent.com/sQqMpT31Gydg-oGgnBw6hWQtaLsNFTyNgegllf6UK95ssJzsM3kKyMYKNrJW4op2NJ2KEjHaPkBAgKzEUPKQvRk4npzIX0t22w=w230-rw',
        //     'https://lh3.googleusercontent.com/ilEQK9YeUtlmH2pCf1z-2SKTWtsAnZJB42ekGQpw0o1nivM47NcEp0gmr6_uKnf-MiFzXefT4kda504KrNdvn2KExMjJ7AF7=w230-rw',
        //     'https://lh3.googleusercontent.com/tr8DIerJp1-zRdtNUUyJu9ObXSsiqbB2C3UYVIMIkTIGHycwEcec9LO4swOAaJGugnNi-lM_0gwugxTWeYDNsVVN6JMNAz0b=w230-rw',
        //     'https://lh3.googleusercontent.com/H0ovo5ge_Dy8YVpZkMX6j7Fwu6evEnmfVlS-ICGAKsVIdoCAkI71vUq7vgSGvi2TjvE69QuhMuXecql4uuYzlCizHP2MsYI=w230-rw',
        //     'https://lh3.googleusercontent.com/ZOHNa_ZSMdhAZoGPUdkc_aptrAb7dO0gD50NvhjoPoN4drnzfarq6X9AzUVGfyPeSVdbzAhTMA01MVInJL8cedVW47iKhag6=w230-rw',
        //     'https://lh3.googleusercontent.com/Y8Hy7lT_W1Ct95fLlYMt9Vj1lXI-gR3yRmYiE3lUgWnzCzciU8bNzvei6qRu36_z0TPcmW46NvPgSbDCKfw8hLTVUTR8CC6E=w230-rw',
        //     'https://lh3.googleusercontent.com/sQqMpT31Gydg-oGgnBw6hWQtaLsNFTyNgegllf6UK95ssJzsM3kKyMYKNrJW4op2NJ2KEjHaPkBAgKzEUPKQvRk4npzIX0t22w=w230-rw',
        //     'https://lh3.googleusercontent.com/ilEQK9YeUtlmH2pCf1z-2SKTWtsAnZJB42ekGQpw0o1nivM47NcEp0gmr6_uKnf-MiFzXefT4kda504KrNdvn2KExMjJ7AF7=w230-rw',
        //     'https://lh3.googleusercontent.com/tr8DIerJp1-zRdtNUUyJu9ObXSsiqbB2C3UYVIMIkTIGHycwEcec9LO4swOAaJGugnNi-lM_0gwugxTWeYDNsVVN6JMNAz0b=w230-rw',
        //     'https://lh3.googleusercontent.com/H0ovo5ge_Dy8YVpZkMX6j7Fwu6evEnmfVlS-ICGAKsVIdoCAkI71vUq7vgSGvi2TjvE69QuhMuXecql4uuYzlCizHP2MsYI=w230-rw',
        //     'https://lh3.googleusercontent.com/ZOHNa_ZSMdhAZoGPUdkc_aptrAb7dO0gD50NvhjoPoN4drnzfarq6X9AzUVGfyPeSVdbzAhTMA01MVInJL8cedVW47iKhag6=w230-rw',
        //     'https://lh3.googleusercontent.com/Y8Hy7lT_W1Ct95fLlYMt9Vj1lXI-gR3yRmYiE3lUgWnzCzciU8bNzvei6qRu36_z0TPcmW46NvPgSbDCKfw8hLTVUTR8CC6E=w230-rw',
        //     'https://lh3.googleusercontent.com/sQqMpT31Gydg-oGgnBw6hWQtaLsNFTyNgegllf6UK95ssJzsM3kKyMYKNrJW4op2NJ2KEjHaPkBAgKzEUPKQvRk4npzIX0t22w=w230-rw',
        //     'https://lh3.googleusercontent.com/ilEQK9YeUtlmH2pCf1z-2SKTWtsAnZJB42ekGQpw0o1nivM47NcEp0gmr6_uKnf-MiFzXefT4kda504KrNdvn2KExMjJ7AF7=w230-rw',
        // ])
        
    }, [listAnh])

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
        onUpdateImage(idColor, imageSelect);
        handleClose();
    }
    
    useEffect(() => {
    }, [listAnhTemp])
  const handleClickOpen = () => {
    setOpenAlbum(true);
  };

  const handleClose = () => {
    setOpenAlbum(null);
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
              Chọn tối đa 3 ảnh cho màu "{nameColor}"
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
    </React.Fragment>
  );
}

export default AlbumImage;