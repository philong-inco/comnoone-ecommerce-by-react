import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { createNewRam, IsValidAdd, IsValidUpdate } from 'api/sanpham/ram';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification';
import { isValid } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AlertComNoOne from '../../ui-component/AlertComNoOne';
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #673AB7',
    borderRadius: '10px',
    p: 5,
};

export default function TransitionsModal({fetchRams}) {
    //Thông báo
  const [comNoti, setComNoti] = useState({
    message: '', isOpen: false, count: 0
  })
  const alert = (message) => {
    setComNoti(prev => ({...prev, message: message, isOpen: true, count: (comNoti.count + 1)}))
  }
  //Thông báo
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    const [ram, setRam] = useState({
        ten: "",
        dungLuong: "",
        tocDoBus: "",
        trangThai: 1
    });
    const [error, setError] = useState({
        ten: "",
        dungLuong: "",
        tocDoBus: "",
        trangThai: 1
    });


    const handleChange = (e) => {
        const { value, name } = e.target;

        setRam({
            ...ram,
            [name]: value
        });

        // Clear error message when input is not empty
        setError({
            ...error,
            [name]: value ? "" : "Trường này không được để trống"
        });
    };

    const resetForm = () => {
        setRam({
            ten: "",
            dungLuong: "",
            tocDoBus: "",
            trangThai: 1
        });

        setError({
            ten: "",
            dungLuong: "",
            tocDoBus: "",
            trangThai: 1
        });
    };

    const handleSubmit = async () => {
        let formValid = true;
        const newError = { ...error };

        for (const key in ram) {
            if (!ram[key]) {
                newError[key] = "Trường này không được để trống";
                formValid = false;
            }
        }

        setError(newError);
        try{
            const checkName = await IsValidAdd(ram.ten);
            if (!checkName){
                formValid = false;
                console.log('checkName: ', checkName);
                alert('Tên đã tồn tại')
            }
            if(ram.ten.length > 200 || ram.dungLuong.length > 200 || ram.tocDoBus.length > 200){
                alert("Ký tự tối đa 200 ký tự");
                return;
            }
            if (formValid) {
               const res = await createNewRam({
                dungLuong: ram.dungLuong,
                ten: ram.ten,
                tocDoBus: ram.tocDoBus,
                trangThai: ram.trangThai
               })
               
               
               if(res){
                toast.success(NotificationStatus.CREATED)
                fetchRams()
                handleClose()
               } else {
                toast.error(NotificationStatus.ERROR)
               }
            }
        }catch(error){
           if (error.status == 403){
              alert("Không đủ quyền thực hiện chức năng này")
           }
           if (error.status == 401){
              navigate(`/login`);
           }
        }
        
    };

    return (
        <div>
            <Button variant="contained" color="secondary"  endIcon={<Add />} onClick={handleOpen}>
                Tạo mới
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '40px',
                                textAlign: 'center'
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '30px'
                                }}
                            >
                                THÊM RAM
                            </h2>
                            <TextField 
                                label="Tên RAM" 
                                style={{ width: '100%' }} 
                                name="ten"
                                error={!!error.ten}
                                helperText={error.ten}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Dung lượng" 
                                style={{ width: '100%' }} 
                                name="dungLuong"
                                error={!!error.dungLuong}
                                helperText={error.dungLuong}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Tốc độ Bus" 
                                style={{ width: '100%' }} 
                                name="tocDoBus"
                                error={!!error.tocDoBus}
                                helperText={error.tocDoBus}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'end',
                            marginTop: '20px',
                            gap: '10px'
                        }}>
                            <Button variant="contained" color="secondary" onClick={handleClose}>Hủy</Button>
                            <Button variant="contained" color="secondary" onClick={handleSubmit}>Xác Nhận</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
            <AlertComNoOne
        message={comNoti.message}
        isOpen={comNoti.isOpen}
        count={comNoti.count}
      ></AlertComNoOne>
        </div>
    );
}
``  
