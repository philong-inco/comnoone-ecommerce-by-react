import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { createNewRam, IsValidAdd, IsValidUpdate } from 'api/sanpham/mauSac';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification';

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

export default function CreateQuickly({fetchRams,setHide}) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetForm();
        setHide(prev => ({...prev, mauSac: false}))
    };

    const [ram, setRam] = useState({
        ten: "",
        trangThai: 1
    });
    const [error, setError] = useState({
        ten: "",
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
        const checkName = await IsValidAdd(ram.ten);
        if (!checkName){
            formValid = false;
            console.log('checkName: ', checkName);
            alert('Tên đã tồn tại')
        }
        if (formValid) {
           const res = await createNewRam({
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
                                THÊM MÀU SẮC
                            </h2>
                            <TextField 
                                label="Tên Màu Sắc" 
                                style={{ width: '100%' }} 
                                name="ten"
                                error={!!error.ten}
                                helperText={error.ten}
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
        </div>
    );
}
``  
