import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, TextField, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';

const PaymentDialog = (props) => {
  const { open, onClose, data } = props;
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Phương thức thanh toán (cash hoặc transfer)
  const [cashAmount, setCashAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);

  // Hàm thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setPaymentMethod(newMethod);
    }
  };

  // Hàm xử lý nhập tiền
  const handleAmountChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // Không cho phép nhập số âm
    if (paymentMethod === 'cash') {
      setCashAmount(value); // Lưu giá trị tiền mặt
    } else if (paymentMethod === 'transfer') {
      setTransferAmount(value); // Lưu giá trị chuyển khoản
    }
  };

  // Tính tổng tiền
  const totalAmount = cashAmount + transferAmount;

  console.log('PAY DATA : ', data);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Tiến hành thanh toán</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Khách cần trả: {data.tongTienPhaiTra}</Typography>
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
              label={`Nhập số tiền (${paymentMethod === 'cash' ? 'Tiền mặt' : paymentMethod === 'transfer' ? 'Chuyển khoản' : 'VNPAY'})`}
              type="number"
              value={paymentMethod === 'cash' ? cashAmount : transferAmount}
              onChange={handleAmountChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              Tổng tiền đã nhập: {totalAmount.toLocaleString()} đ
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={onClose}>
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
