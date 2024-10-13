import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { createNewRam } from 'api/sanpham/nhucau';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification';

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

export default function TransitionsModal({fetchRams}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    const [ram, setRam] = useState({
        ten: "",
        moTa: "",
        trangThai: 1
    });
    const [error, setError] = useState({
        ten: "",
        moTa: "",
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
            moTa: "",
            trangThai: 1
        });

        setError({
            ten: "",
            moTa: "",
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
           const res = await createNewRam({
            ten: ram.ten,
            moTa: ram.moTa,
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
            <Button endIcon={<Add />} onClick={handleOpen}>
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
                                THÊM NHU CẦU
                            </h2>
                            <TextField 
                                label="Tên Nhu Cầu" 
                                style={{ width: '100%' }} 
                                name="ten"
                                error={!!error.ten}
                                helperText={error.ten}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Mô tả" 
                                style={{ width: '100%' }} 
                                name="moTa"
                                error={!!error.moTa}
                                helperText={error.moTa}
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
