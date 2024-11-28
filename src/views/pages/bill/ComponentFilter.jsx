import React from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Divider, Tooltip } from '@mui/material';
import { Search, Add, FileDownload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ComponentFilter(props) {
  const { handleSearch, handleCreateBill, onDateChange, fromDate, toDate, handleBillTypeChange, handlePrint } = props;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    onDateChange(name, value);
  };
  return (
    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
      <Grid container spacing={2} className="mb-10">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm mã hóa đơn , sdt , email"
            InputProps={{
              startAdornment: <Search style={{ marginRight: '8px' }} />
            }}
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          {/* <Button variant="outlined" color="primary" startIcon={<FileDownload />}></Button> */}
          <Tooltip title="Tải file excel" arrow placement="top">
            <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }} onClick={handlePrint}>
              <FileDownload />
            </Button>
          </Tooltip>
          <Tooltip title="Tạo hóa đơn" arrow placement="top">
            <Button
              variant="contained"
              color="secondary"
              // startIcon={<Add />}
              onClick={() => {
                navigate('/ban-hang');
              }}
              style={{ marginLeft: '10px' }}
            >
              <Add />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider style={{ margin: '10px 0' }} />

      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Từ ngày"
            type="date"
            name="tuNgay"
            value={fromDate ? fromDate : ''}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Đến ngày"
            name="denNgay"
            type="date"
            value={toDate ? toDate : ''}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} container alignItems="center" style={{ display: 'flex' }}>
          <FormControl component="fieldset" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* <FormLabel component="legend" style={{ marginRight: '10px' }}>
              Loại:
            </FormLabel> */}
            <RadioGroup row defaultValue={''} onChange={handleBillTypeChange} style={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel value={''} control={<Radio />} label="Tất cả" />
              <FormControlLabel value={'0'} control={<Radio />} label="Tại quầy" />
              <FormControlLabel value={'1'} control={<Radio />} label="Online" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default ComponentFilter;
