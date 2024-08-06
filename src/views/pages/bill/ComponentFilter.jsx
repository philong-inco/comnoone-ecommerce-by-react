import React from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Divider } from '@mui/material';
import { Search, Add, FileDownload } from '@mui/icons-material';

function ComponentFilter(props) {
  const { handleSearch, handleCreateBill, onDateChange, fromDate, toDate, handleBillTypeChange } = props;
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
            placeholder="Tìm kiếm mã hóa đơn, sdt, email"
            InputProps={{
              startAdornment: <Search style={{ marginRight: '8px' }} />
            }}
            onChange={(e) => handleSearch(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleCreateBill}>
            Tạo hóa đơn
          </Button>
          <Button variant="outlined" color="primary" startIcon={<FileDownload />} style={{ marginLeft: '10px' }}>
            Export Excel
          </Button>
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

        {/* <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
              startText="Từ ngày"
              endText="Đến ngày"
              value={[fromDate ? moment(fromDate) : null, toDate ? moment(toDate) : null]}
              onChange={(newValue) => handleDateChange(newValue)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} fullWidth size="small" variant="outlined" />
                  <TextField {...endProps} fullWidth size="small" variant="outlined" style={{ marginLeft: 10 }} />
                </>
              )}
            />
          </LocalizationProvider> */}
        <Grid item xs={12} sm={6} container alignItems="center">
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ marginRight: '10px' }}>
              Loại:
            </FormLabel>
            <RadioGroup row defaultValue={''} onChange={handleBillTypeChange}>
              <FormControlLabel value={''} control={<Radio />} label="Tất cả" />
              <FormControlLabel value={'0'} control={<Radio />} label="Tại quầy" />
              <FormControlLabel value={'1'} control={<Radio />} label="Online" />
            </RadioGroup>
          </FormControl>
          <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
            Export
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ComponentFilter;
