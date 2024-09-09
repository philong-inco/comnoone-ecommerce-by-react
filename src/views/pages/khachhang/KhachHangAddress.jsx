import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function Calendarwork() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [chuThich, setChuThich] = useState('');
  const [idNhanVien, setIdNhanVien] = useState('');
  const [idCaLamViec, setIdCaLamViec] = useState('');
  const [danhSachNhanVien, setDanhSachNhanVien] = useState([]);
  const [danhSachCaLamViec, setDanhSachCaLamViec] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAllNhanVien();
        await fetchAllCaLamViec();
        await fetchAllLichLamViec();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChuThich('');
    setIdNhanVien('');
    setIdCaLamViec('');
    setSelectedDate(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchAllLichLamViec = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lichlamviec/danhsachlich');
      if (Array.isArray(response.data)) {
        const lichLamViecEvents = await Promise.all(response.data.map(async (item) => {
          const tenNhanVien = await findNhanVien(item.nhanVien);
          const moTaCaLamViec = await findCaLamViec(item.caLamViec);

          return {
            title: `${tenNhanVien} + ${moTaCaLamViec}` + item.chuThich,
            start: moment(item.ngayLamViec).toDate(),
            end: moment(item.ngayLamViec).toDate(),
            allDay: true,
            extendedProps: {
              idNhanVien: item.idNhanVien,
              idCaLamViec: item.idCaLamViec,
            },
          };
        }));
        setEvents(lichLamViecEvents);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAllNhanVien = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/nhan_vien/danhsachnhanvien');
      setDanhSachNhanVien(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCaLamViec = async () => {
    try {
      const results = await axios.get('http://localhost:8080/api/ca_lam_viec/danhsach');
      if (Array.isArray(results.data)) {
        setDanhSachCaLamViec(results.data);
      } else {
        console.error('Expected an array for danhSachCaLamViec, but got:', results.data);
        setDanhSachCaLamViec([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEvent = async () => {
    if (chuThich && idNhanVien && idCaLamViec && selectedDate) {
      try {
        const tenNhanVien = await findNhanVien(idNhanVien);
        const moTaCaLamViec = await findCaLamViec(idCaLamViec);

        const newEvent = {
          title: `${tenNhanVien} / ${moTaCaLamViec}`,
          start: selectedDate,
          end: selectedDate,
          allDay: true,
          extendedProps: {
            idNhanVien: idNhanVien,
            idCaLamViec: idCaLamViec,
          },
        };

        await axios.post('http://localhost:8080/api/lichlamviec/addlichnhanvien', {
          chuThich,
          idNhanVien,
          idCaLamViec,
          ngayLamViec: moment(selectedDate).format('YYYY-MM-DD')
        });


        setEvents([...events, newEvent]);

        setSnackbarMessage('Lịch làm việc đã được thêm thành công!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        await fetchAllLichLamViec();
        handleClose();
      } catch (error) {
        console.error('Error saving event:', error);
        setSnackbarMessage('Đã xảy ra lỗi khi thêm lịch làm việc!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleConfirmSave = () => {
    setConfirmOpen(false);
    handleSaveEvent();
  };

  const customStyles = {
    event: {
      backgroundColor: '#4CAF50',
      color: 'white',
      borderRadius: '5px',
      padding: '5px',
      fontSize: '14px',
    },
    dayCell: {
      height: '150px',
      fontSize: '16px',
      padding: '10px',
    },
  };

  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: '100%', margin: '20px' }}
        views={['month']}
        defaultView="month"
        components={{
          event: ({ event }) => (
            <div style={customStyles.event}>
              {event.title}
            </div>
          ),
          month: {
            dateCellWrapper: ({ children }) => (
              <div style={customStyles.dayCell}>
                {children}
              </div>
            ),
          },
        }}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>Thêm Lịch Làm Việc</h2>

          <FormControl fullWidth margin="normal">
            <InputLabel>ID Nhân Viên</InputLabel>
            <Select
              value={idNhanVien}
              onChange={(e) => setIdNhanVien(e.target.value)}
            >
              {danhSachNhanVien.map((nhanVien) => (
                <MenuItem key={nhanVien.id} value={nhanVien.id}>
                  {nhanVien.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>ID Ca Làm Việc</InputLabel>
            <Select
              value={idCaLamViec}
              onChange={(e) => setIdCaLamViec(e.target.value)}
            >
              {danhSachCaLamViec.map((caLamViec) => (
                <MenuItem key={caLamViec.id} value={caLamViec.id}>
                  {caLamViec.moTa}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Ngày Làm Việc"
            value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : ''}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Chú Thích"
            value={chuThich}
            onChange={(e) => setChuThich(e.target.value)}
            error={!chuThich}
            helperText={!chuThich ? 'Chú thích không được để trống' : ''}
            inputProps={{ maxLength: 255 }}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={() => setConfirmOpen(true)}>
            Lưu
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn thêm lịch làm việc cho ngày {moment(selectedDate).format('DD/MM/YYYY')} không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirmSave} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Calendarwork;
