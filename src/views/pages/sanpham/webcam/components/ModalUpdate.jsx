import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Add, Edit } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification';
import { updateRam, IsValidAdd, IsValidUpdate } from 'api/sanpham/webcam';
import { useNavigate } from 'react-router-dom';
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

export default function ModalUpdate({fetchRams, info}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    
    
    const [ram, setRam] = useState({
        ten: "",
        doPhanGiai: "",
        trangThai: 1
    });
    const [error, setError] = useState({
        ten: "",
        doPhanGiai: "",
        trangThai: 1
    });

    useEffect(() => {
        if(info && open){
            setRam({
                ten: info.ten,
                doPhanGiai: info.doPhanGiai,
                trangThai: 1
            })
        }
    }, [info, open])


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
        doPhanGiai: "",
        trangThai: 1
        });

        setError({
            ten: "",
        doPhanGiai: "",
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
            const checkName = await IsValidUpdate(ram.ten, info.id);
            if (!checkName){
                formValid = false;
                console.log('checkName: ', checkName);
                alert('Tên đã tồn tại')
            }
            if(ram.ten.length > 200 || ram.doPhanGiai.length > 200){
                alert("Ký tự tối đa 200 ký tự");
                return;
            }
            if (formValid) {
               const res = await updateRam({
                id: info.id,
                doPhanGiai: ram.doPhanGiai,
                ten: ram.ten,
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
            <IconButton sx={{color: '#6C6C6C'}} onClick={handleOpen}>
            <Edit />
            </IconButton>
            
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
                                CHỈNH SỬA
                            </h2>
                            <TextField 
                                label="Tên Webcam" 
                                style={{ width: '100%' }} 
                                name="ten"
                                error={!!error.ten}
                                helperText={error.ten}
                                onChange={handleChange}
                                value={ram.ten}
                            />
                            <TextField 
                                label="Độ phân giải" 
                                style={{ width: '100%' }} 
                                name="doPhanGiai"
                                error={!!error.doPhanGiai}
                                helperText={error.doPhanGiai}
                                onChange={handleChange}
                                value={ram.doPhanGiai}
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{marginTop: '10px', fontStyle:'italic', color: 'gray'}}>
                                <p>Ngày tạo: {info.ngayTao}</p>
                                <p>Người tạo: {info.nguoiTao}</p>
                                <p>Ngày sửa: {info.ngaySua}</p>
                                <p>Người sửa: {info.nguoiSua}</p>
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
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
``  
