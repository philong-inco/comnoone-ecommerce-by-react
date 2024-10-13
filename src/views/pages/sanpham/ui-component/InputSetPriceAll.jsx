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

export default function InputSetPriceAll({ title, message, open, setOpen, setPriceAll }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPriceAll(price);
  };

  const [price, setPrice] = useState('');

  const handleWritePrice = (e) => {
    setPrice(e.target.value);
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
            {/* <TextField rows={1} maxRows={2} multiline fullWidth onChange={handleWritePrice} id="price" label="Nhập giá chung các biến thể" /> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Đặt giá chung
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
