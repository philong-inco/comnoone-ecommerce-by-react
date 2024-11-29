import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views  } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function Calendarwork() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);  
  const [chuThich, setChuThich] = useState('');
  const [idNhanVien, setIdNhanVien] = useState('');
  const [idCaLamViec, setIdCaLamViec] = useState('');
  const [danhSachNhanVien, setDanhSachNhanVien] = useState([]);
  const [danhSachCaLamViec, setDanhSachCaLamViec] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchAllNhanVien();
        await fetchAllCaLamViec();
        await fetchAllLichLamViec();
        setLoading(false);
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

  function CustomToolbar({ label, onNavigate, onView }) {
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('PREV')}>Trước</button>
          <button type="button" onClick={() => onNavigate('TODAY')}>Hôm nay</button>
          <button type="button" onClick={() => onNavigate('NEXT')}>Tiếp</button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        
      </div>
    );
  }

  const handleClose = () => {
    setOpen(false);
    setChuThich('');
    setIdNhanVien('');
    setIdCaLamViec('');
    setSelectedDate(null);
  };

  const findNhanVien = async (id) => {
    const result = await axios.get(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/nhan_vien/${id}`);
    return result.data.ten;
  }

  const findCaLamViec = async (id) => {
    const result = await axios.get(`https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/ca_lam_viec/searchcalamviec/${id}`);
    return result.data.moTa;
  }

  const fetchAllLichLamViec = async () => {
    try {

      debugger;
      const response = await axios.get('https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/lichlamviec/danhsachlich');
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
      const result = await axios.get('https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/nhan_vien/danhsachnhanvien');
      setDanhSachNhanVien(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCaLamViec = async () => {
    try {
      const results = await axios.get('https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/ca_lam_viec/danhsach');
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

        await axios.post('https://weblaptop-by-springboot-and-reactjs-ji0q.onrender.com/api/lichlamviec/addlichnhanvien', {
          chuThich,
          idNhanVien,
          idCaLamViec,
          ngayLamViec: moment(selectedDate).format('YYYY-MM-DD')
        });

        await fetchAllLichLamViec();
        setEvents([...events, newEvent]);
        handleClose();
      } catch (error) {
        console.error('Error saving event:', error);
      }
    }
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
          <Button variant="contained" color="primary" onClick={handleSaveEvent}>
            Lưu
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Calendarwork;
