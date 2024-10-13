import  React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useSWR from 'swr';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImportSerialForm({ title, message, open, setOpen, serialNumbers, setSerialNumbers }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSerialNumbers(serialNumbersClone)
  };

  const [serialNumbersClone, setSerialNumbersClone] = useState({});
  useEffect(()=>{
    setSerialNumbersClone({...serialNumbers});
  }, [serialNumbers])

  const handleWriteSerial = (e) => {
    const serials = e.target.value;
    console.log('1Seri từ con: ', serials)
    setSerialNumbersClone(prev => ({
        ...prev,
        value: serials
    }))
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
        sx={{minHeight: '80%', minWidth: '70%'}}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
            <br /><br />
            <TextField fullWidth rows={10} value={serialNumbersClone.value} onChange={handleWriteSerial} id="serial" label="Danh sách serial number" multiline maxRows={10} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Nhập Serial
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
