import MainCard from 'ui-component/cards/MainCard';
import TransitionsModal from './components/ModalCreate';
import { deleteRam, getRams, filterRam, updateRam } from 'api/sanpham/oCung';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ModalUpdate from './components/ModalUpdate';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Switch} from '@mui/material';
import axios from 'axios';
import { backEndUrl } from 'utils/back-end';



const DanhSachOCung = () => {
  const columns = [
    
    { id: 'ma', label: 'Mã', minWidth: 70 },
    { id: 'ten', label: 'Tên', minWidth: 350 },
    { id: 'dungLuong', label: 'Dung lượng', minWidth: 80 },
    { id: 'trangThai', label: 'Trạng thái', minWidth: 80},
    { id: 'hanhDong', label: 'Hành động', minWidth: 170 },
  ];

  const [pageInfo, setPageInfo] = useState({
    pageNo: '', pageSize: '', totalPage:'', totalElement:''
  })
  const [data, setData] = useState([]);
  useEffect(()=>{
    console.log('data: ', data);
  },[data])
  const[filter, setFilter] = useState({
    page: '0', size: '5', name: '', trangThai: ''
  })
  useEffect(()=> {
    console.log('filter: ', filter); 
    fetchData();
  }, [filter])

  const fetchData = async () => {
    const data = await filterRam(filter);
    setData(data.data.data);
    setPageInfo(prev => ({
      ...prev, pageNo: data.data.pageNo, pageSize: data.data.pageSize, 
      totalPage:data.data.totalPage, totalElement:data.data.totalElement
    }))
  }

  
  const handleName = (e) => {
    setFilter(prev => ({...prev, page: 0, size: 5, name: e.target.value}));
  }
  const handleTrangThai = (e) => {
    setFilter(prev => ({...prev,page: 0, size: 5, trangThai: e.target.value}));
  }
  const handleChangePage = (event, newPage) => {
    console.log('newPage: ', newPage);
    setFilter(prev => ({
        ...prev,
        page: newPage
    }));
};

const handleChangeRowsPerPage = (event) => {
    setFilter(prev => ({
        ...prev,
        size: event.target.value
    }));
};
const handleSwitchChange = (id) => (e) => {
  e.target.checked ? suaTrangThai(id, 1) : suaTrangThai(id, 0);
};

const suaTrangThai = async (id, status) => {
  let tempData = await axios.get(`${backEndUrl}/o-cung/detail/${id}`);
  let temp = tempData.data.data;
  console.log('temp: ', temp);
  let temp1 = {...temp, trangThai: status}
  console.log('temp1: ', temp1);
  await updateRam(temp1);
  fetchData();
};


  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <MainCard>
          <div style={{display: 'flex', justifyContent:'space-between'}}>
            <div>
              <TextField sx={{ width: '400px' }} color='secondary' onChange={handleName} id="outlined-basic" label="Tìm theo tên" variant="outlined" />
              <FormControl
                sx={{width: '200px', marginLeft: '20px'}}
              >
                <InputLabel id="demo-simple-select-label">Trạng Thái</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter.trangThai}
                  label="Trạng thái"
                  onChange={handleTrangThai}
                >
                  <MenuItem value={''}>Tất cả</MenuItem>
                  <MenuItem value={1}>Hoạt động</MenuItem>
                  <MenuItem value={0}>Không hoạt động</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TransitionsModal fetchRams={fetchData} />
            </div>
          </div>
          
        </MainCard>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              const rowIndex = filter.page * filter.size + index + 1;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                     <TableCell align='left'>{rowIndex}</TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'trangThai'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value === 1 
                            // ? <Switch defaultChecked color="secondary" onChange={handleSwitchChange(row.id)}/>
                            //     : <Switch color="secondary" onChange={handleSwitchChange(row.id)}/>
                            ? 'Hoạt động' : 'Đã tắt'
                            }
                            </TableCell>
                        )
                      }
                      if (column.id === 'hanhDong'){
                        let value1 = row['trangThai'];
                        return (
                          <div style={{display: 'flex'}}>
                            <TableCell sx={{display: 'flex'}} key={column.id} align={column.align}>
                              <ModalUpdate fetchRams={fetchData} info={row}/>
                              {value1 === 1 && <Switch defaultChecked color="secondary" onChange={handleSwitchChange(row.id)}/>}
                              {value1 === 0 && <Switch color="secondary" onChange={handleSwitchChange(row.id)}/>}
                            </TableCell>
                           
                          </div> 
                        )
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={pageInfo.totalElement}
        rowsPerPage={filter.size}
        page={filter.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}

export default DanhSachOCung;

