import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

function Notification({ message = 'This is a success Alert inside a Snackbar!', title = 'Notification', color = 'success' }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setOpen(true);
    }, 0);

    const closeTimer = setTimeout(() => {
      setOpen(false);
    }, 6000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={null} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={color} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
