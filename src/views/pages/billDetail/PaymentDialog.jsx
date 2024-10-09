import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Tooltip
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const PaymentDialog = (props) => {
  const { open, onClose, data, onSubmit } = props;
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashAmount, setCashAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);
  const [isAmountValid, setIsAmountValid] = useState(true);

  const handlePaymentMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setPaymentMethod(newMethod);
    }
  };

  const handleAmountChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    if (paymentMethod === 'cash') {
      setCashAmount(value);
    } else if (paymentMethod === 'transfer') {
      setTransferAmount(value);
    }
  };

  const calculateTotalAmount = (data) => {
    return data.loaiHoaDon === 1 ? data.tongTienPhaiTra : data.tongTienPhaiTra + data.tienShip;
  };

  useEffect(() => {
    if (data) {
      setTotalAmount(calculateTotalAmount(data));
    }
  }, [data]);

  useEffect(() => {
    const totalPaid = cashAmount + transferAmount;
    if (totalPaid >= totalAmount) {
      setChangeAmount(totalPaid - totalAmount);
      setIsAmountValid(true);
    } else {
      setChangeAmount(0);
      setIsAmountValid(false);
    }
  }, [cashAmount, transferAmount, totalAmount]);

  const handleClear = () => {
    setCashAmount(0);
    setTransferAmount(0);
    setChangeAmount(0);
    setIsAmountValid(true);
  };

  const handleConfirm = () => {
    const totalPaid = cashAmount + transferAmount;
    if (totalPaid < totalAmount) {
      alert('Số tiền nhập vào không đủ để thanh toán!');
      return;
    }
    if (!isAmountValid) {
      alert('Số tiền nhập vào không đủ để thanh toán!');
      return;
    }
    const paymentData = {
      idTienMat: cashAmount > 0 ? 1 : null,
      idChuyenKhoan: transferAmount > 0 ? 2 : null,
      soTienMat: cashAmount,
      soTienChuyenKhoan: transferAmount,
      totalAmount,
      changeAmount
    };

    onSubmit(paymentData); // Gửi dữ liệu lên cha
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="h2">
        Tiến hành thanh toán
        <IconButton onClick={handleClear} aria-label="clear" size="small" style={{ float: 'right' }}>
          <Tooltip title="Xóa hết giá trị đã nhập">
            <ClearIcon />
          </Tooltip>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" color="error">
              Cần thanh toán: {totalAmount.toLocaleString()} VNĐ
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <ToggleButtonGroup value={paymentMethod} exclusive onChange={handlePaymentMethodChange} fullWidth>
              <ToggleButton value="cash">Tiền mặt</ToggleButton>
              <ToggleButton value="transfer">Chuyển khoản</ToggleButton>
              <ToggleButton value="vnpay">Ví VNPAY</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label={`Nhập số tiền (${paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'})`}
              type="number"
              value={paymentMethod === 'cash' ? cashAmount : transferAmount}
              onChange={handleAmountChange}
              fullWidth
              error={!isAmountValid}
              helperText={!isAmountValid ? 'Số tiền nhập vào không đủ!' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
              Tiền mặt: {cashAmount.toLocaleString()} VNĐ
            </Typography>
            <Typography variant="h4" color="primary">
              Chuyển khoản: {transferAmount.toLocaleString()} VNĐ
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3" color="primary">
              Tổng tiền đã nhập: {(cashAmount + transferAmount).toLocaleString()} VNĐ
            </Typography>
            <Typography variant="h3" color="primary">
              Tiền thừa: {changeAmount.toLocaleString()} VNĐ
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleConfirm}>
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
