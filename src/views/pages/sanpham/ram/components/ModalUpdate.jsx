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
import { updateRam } from 'api/sanpham/ram';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 5,
};

export default function ModalUpdate({fetchRams, info}) {
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

    useEffect(() => {
        if(info && open){
            setRam({
                ten: info.ten,
                dungLuong: info.dungLuong,
                tocDoBus: info.tocDoBus,
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
            trangThai: 1
        });

        setError({
            ten: "",
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

        if (formValid) {
           const res = await updateRam({
            id: info.id,
            dungLuong: ram.dungLuong,
            tocDoBus: ram.tocDoBus,
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
    };

    return (
        <div>
            <IconButton color="primary" onClick={handleOpen}>
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
                                label="Tên RAM" 
                                style={{ width: '100%' }} 
                                name="ten"
                                error={!!error.ten}
                                helperText={error.ten}
                                onChange={handleChange}
                                value={ram.ten}
                            />
                            <TextField 
                                label="Dung lượng" 
                                style={{ width: '100%' }} 
                                name="dungLuong"
                                error={!!error.dungLuong}
                                helperText={error.dungLuong}
                                onChange={handleChange}
                                value={ram.dungLuong}
                            />
                            <TextField 
                                label="Tốc độ Bus" 
                                style={{ width: '100%' }} 
                                name="tocDoBus"
                                error={!!error.tocDoBus}
                                helperText={error.tocDoBus}
                                onChange={handleChange}
                                value={ram.tocDoBus}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'end',
                            marginTop: '20px',
                            gap: '10px'
                        }}>
                            <Button className='btn' onClick={handleClose}>Hủy</Button>
                            <Button className='btn' onClick={handleSubmit}>Xác Nhận</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
``  
