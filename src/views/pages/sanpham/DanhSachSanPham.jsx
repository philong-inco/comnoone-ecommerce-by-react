import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { FloatButton} from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import MainCard from 'ui-component/cards/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import { 
    TextField,FormLabel, RadioGroup, 
    FormControl,FormControlLabel , Radio,Paper,
    Table,TableBody,TableCell,
    TableContainer,TableHead,TablePagination,
    TableRow,Chip,Switch
} from '@mui/material';
// My component
import SelectDropDown from '../sanpham/ui-component/SelectDropDown.jsx';
import ButtonAdd from './ui-component/ButtonAdd.jsx';

import Loader from 'ui-component/Loader';
import { maxHeight } from '@mui/system';

const DanhSachSanPham = () => {
  const navigate = useNavigate();
    const handleUpdate = (id) => {
        navigate(`/sanpham/update/${id}`);
    };
    const handleAdd = () => {
      console.log("add nè")
        navigate(`/sanpham/add`);
    };

    // 0: tìm theo tên, 1: tìm theo mã
    const [typeOfFilter, setTypeOfFilter] = useState('0');

    const changeTypeOfFilter = (e) => {
        const type = e.target.value;
        setTypeOfFilter(type);
        if (type === '0') {
            setFilter(prev => ({
                ...prev,
                tenSanPham: filter.ma,
                ma: ''
            }))
        } else if (type === '1') {
            setFilter(prev => ({
                ...prev,
                ma: filter.tenSanPham,
                tenSanPham: ''
            }))
        }

    }

    const [resetFilter, setResetFilter] = useState(0);

    const cleanFilter = () => {

        setNhuCauChecked([]);
        setThuongHieuChecked([]);
        setTrangThaiChecked([]);
        setRamChecked([]);
        setCPUChecked([]);
        setVGAChecked([]);
        setManHinhChecked([]);
        setBanPhimChecked([]);
        setWebcamChecked([]);
        setHeDieuHanhChecked([]);
        setOCungChecked([]);
        setmauSacChecked([]);
        setTypeOfFilter('0');
        setFilter(prev => ({
            ...prev,
            tenSanPham: '',
            ma: ''
        }))
        setResetFilter(prev => prev + 1);
    }

    const urlFindFilter = 'http://localhost:8080/api/san-pham/find/filter-id?';
    const [sanPham, setsanPham] = useState([]);
    const [filter, setFilter] = useState({
        page: '0',
        size: '5',
        tenSanPham: '',
        ma: '',
        ngayTaoTruoc: '',
        ngayTaoSau: '',
        ngaySuaTruoc: '',
        ngaySuaSau: '',
        trangThai: '',
        idNhuCau: '',
        idThuongHieu: '',
        idRam: '',
        idMauSac: '',
        idCPU: '',
        idVGA: '',
        idWebcam: '',
        idOCung: '',
        idManHinh: '',
        idHeDieuHanh: '',
        idBanPhim: ''
    });

    // Data for filters
    const [nhuCau, setNhuCau] = useState([]);
    const [thuongHieu, setThuongHieu] = useState([]);
    const [ram, setRam] = useState([]);
    const [mauSac, setmauSac] = useState([]);
    const [CPU, setCPU] = useState([]);
    const [VGA, setVGA] = useState([]);
    const [webcam, setWebcam] = useState([]);
    const [oCung, setOCung] = useState([]);
    const [manHinh, setManHinh] = useState([]);
    const [heDieuHanh, setHeDieuHanh] = useState([]);
    const [banPhim, setBanPhim] = useState([]);
    const [trangThai, setTrangThai] = useState([
        { id: 1, ten: 'Hoạt động' },
        { id: 0, ten: 'Đã tắt' }
    ]);

    // Danh sách các giá trị được chọn
    const [nhuCauChecked, setNhuCauChecked] = useState([]);
    const [thuongHieuChecked, setThuongHieuChecked] = useState([]);
    const [ramChecked, setRamChecked] = useState([]);
    const [mauSacChecked, setmauSacChecked] = useState([]);
    const [CPUChecked, setCPUChecked] = useState([]);
    const [VGAChecked, setVGAChecked] = useState([]);
    const [webcamChecked, setWebcamChecked] = useState([]);
    const [oCungChecked, setOCungChecked] = useState([]);
    const [manHinhChecked, setManHinhChecked] = useState([]);
    const [heDieuHanhChecked, setHeDieuHanhChecked] = useState([]);
    const [banPhimChecked, setBanPhimChecked] = useState([]);
    const [trangThaiChecked, setTrangThaiChecked] = useState([]);

    useEffect(() => {
        loadProducts();
        // Load filter options
        loadFilterOptions();
    }, []);

    // useEffect Attribute Checked

    useEffect(() => {
        const trangThaiInt = trangThaiChecked.join(',');
        setFilter(prev => ({
            ...prev,
            trangThai: trangThaiInt
        }));
        console.log('Trạng thái checked: ', trangThaiChecked);
    }, [trangThaiChecked]);

    useEffect(() => {
        const idString = nhuCauChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idNhuCau: idString
        }));
        console.log('NhuCauChecked: ', nhuCauChecked);
    }, [nhuCauChecked]);

    useEffect(() => {
        const idString = thuongHieuChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idThuongHieu: idString
        }));
    }, [thuongHieuChecked]);

    useEffect(() => {
        const idString = ramChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idRam: idString
        }));
    }, [ramChecked]);

    useEffect(() => {
        const idString = CPUChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idCPU: idString
        }));
    }, [CPUChecked]);

    useEffect(() => {
        const idString = VGAChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idVGA: idString
        }));
    }, [VGAChecked]);

    useEffect(() => {
        const idString = banPhimChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idBanPhim: idString
        }));
    }, [banPhimChecked]);

    useEffect(() => {
        const idString = manHinhChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idManHinh: idString
        }));
    }, [manHinhChecked]);

    useEffect(() => {
        const idString = webcamChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idWebcam: idString
        }));
    }, [webcamChecked]);

    useEffect(() => {
        const idString = heDieuHanhChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idHeDieuHanh: idString
        }));
    }, [heDieuHanhChecked]);

    useEffect(() => {
        const idString = mauSacChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idMauSac: idString
        }));
    }, [mauSacChecked]);

    useEffect(() => {
        const idString = oCungChecked.join(',');
        setFilter(prev => ({
            ...prev,
            idOCung: idString
        }));
    }, [oCungChecked]);

    // useEffect Attribute Checked

    const handleTextFieldSearch = (event) => {
        const keyword = event.target.value.toString().trim();
        if (typeOfFilter === '0') {
            setFilter(prev => (
                {
                    ...prev,
                    tenSanPham: keyword,
                    ma: ''
                }))
        } else if (typeOfFilter === '1') {
            setFilter(prev => (
                {
                    ...prev,
                    ma: keyword,
                    tenSanPham: ''
                }))
        }
    }



    const [totalElement, setTotalElement] = useState(0);

    useEffect(() => {
        loadProducts();
    }, [filter]);

    const loadProducts = async () => {
        const queryString = Object.entries(filter)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const urlQuery = urlFindFilter + queryString;
        const result = await axios.get(urlQuery);
        console.log(urlQuery);
        setsanPham(result.data.data);
        setTotalElement(parseInt(result.data.totalElement));
    };

    const loadFilterOptions = async () => {
        // get các bảng
        const nhuCauResult = await axios.get(`http://localhost:8080/api/nhu-cau/all-list`);
        const thuongHieuResult = await axios.get(`http://localhost:8080/api/thuong-hieu/all-list`);
        const ramResult = await axios.get(`http://localhost:8080/api/ram/all-list`);
        const mauSacResult = await axios.get(`http://localhost:8080/api/mau-sac/all-list`);
        const cpuResult = await axios.get(`http://localhost:8080/api/cpu/all-list`);
        const vgaResult = await axios.get(`http://localhost:8080/api/vga/all-list`);
        const webcamResult = await axios.get(`http://localhost:8080/api/webcam/all-list`);
        const oCungResult = await axios.get(`http://localhost:8080/api/o-cung/all-list`);
        const manHinhResult = await axios.get(`http://localhost:8080/api/man-hinh/all-list`);
        const heDieuHanhResult = await axios.get(`http://localhost:8080/api/he-dieu-hanh/all-list`);
        const banPhimResult = await axios.get(`http://localhost:8080/api/ban-phim/all-list`);

        setNhuCau(nhuCauResult.data.data);
        setThuongHieu(thuongHieuResult.data.data);
        setRam(ramResult.data.data);
        setmauSac(mauSacResult.data.data);
        setCPU(cpuResult.data.data);
        setVGA(vgaResult.data.data);
        setWebcam(webcamResult.data.data);
        setOCung(oCungResult.data.data);
        setManHinh(manHinhResult.data.data);
        setHeDieuHanh(heDieuHanhResult.data.data);
        setBanPhim(banPhimResult.data.data);
    };




    // MUI UI
    const columns = [
        { id: 'ma', label: 'Mã', minWidth: 70 },
        { id: 'ten', label: 'Tên', minWidth: 350 },
        {
            id: 'thuongHieu',
            label: 'Thương hiệu',
            minWidth: 100,
            align: 'left'
        },
        {
            id: 'nhuCau',
            label: 'Nhu cầu',
            minWidth: 100,
            align: 'left'
        },
        {
            id: 'trangThai',
            label: 'Trạng thái',
            minWidth: 30,
            align: 'center',
            format: (value) => value === 1 ? <Chip label="Hoạt động" size='small' color="secondary" /> 
            : 
            <Chip label="Đã tắt" size='small' sx={{backgroundColor: '#EDE7F6'}} />
        },
        {
            id: 'hanhDong',
            label: 'Hành động',
            minWidth: 30,
            align: 'center'
        }
    ];



    const handleSwitchChange = (id) => (e) => {
        console.log('ID:', id);
        console.log('Checked:', e.target.checked);
        e.target.checked ? suaTrangThai(id, 1) : suaTrangThai(id, 0);
    };

    const suaTrangThai = (id, status) => {
        console.log(id, status);
        axios.get(`http://localhost:8080/api/san-pham/change-status?id=${id}&status=${status}`)
            .then(response => {
                loadProducts();
            })
            .catch(error => {
                loadProducts();
            });
    };


    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setFilter(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const handleChangeRowsPerPage = (event) => {
        console.log(event.target.value);
        setFilter(prev => ({
            ...prev,
            size: event.target.value
        }));
    };
    // MUI UI









    // SELECT DROPDOWN

    return (
      <>
        <MainCard label="Danh sách sản phẩm">
            <div key={resetFilter} style={{ marginBottom: 30 }}>
                <Paper>
                    <div style={{ display: 'flex', padding: 10, paddingTop: 20 }}>
                        <TextField sx={{maxHeight: '10px'}} color='secondary' onChange={handleTextFieldSearch} id="outlined-basic" label="Nhập từ khóa" variant="outlined" />
                      
                        <div style={{ marginLeft: 10,display: 'flex', alignItems: 'center' }}>
                        
                            <FormControl>
                                {/* <FormLabel id="demo-controlled-radio-buttons-group">Tìm theo:</FormLabel> */}
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={typeOfFilter}
                                    row
                                    onChange={changeTypeOfFilter}
                                >
                                    <FormControlLabel  value="0" control={<Radio color='secondary' size="small" />} label="Tên" />
                                    <FormControlLabel  value="1" control={<Radio color='secondary' size="small" />} label="Mã" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        
                        <div onClick={cleanFilter} style={{marginLeft: 20, marginTop: 10,marginRight: 20}}>
                            <FilterAltOffOutlinedIcon
                                color='secondary'
                                fontSize='large'
                            />
                        </div>
                        <div style={{flexGrow:'1', display: 'flex', justifyContent: 'end'}}>
                        
                          <ButtonAdd
                          size={"medium"}
                          color={"secondary"}
                          title={"Thêm sản phẩm"}
                          targetUrl={"them"}
                          />
                        
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                        <SelectDropDown
                            list={nhuCau}
                            setListChecked={setNhuCauChecked}
                            nameDropDown={"Nhu cầu"}
                        />
                        <SelectDropDown
                            list={thuongHieu}
                            setListChecked={setThuongHieuChecked}
                            nameDropDown={"Thương hiệu"}
                        />
                        <SelectDropDown
                            list={trangThai}
                            setListChecked={setTrangThaiChecked}
                            nameDropDown={"Trạng thái"}
                        />
                        <SelectDropDown
                            list={ram}
                            setListChecked={setRamChecked}
                            nameDropDown={"RAM"}
                        />
                        <SelectDropDown
                            list={CPU}
                            setListChecked={setCPUChecked}
                            nameDropDown={"CPU"}
                        />
                        <SelectDropDown
                            list={VGA}
                            setListChecked={setVGAChecked}
                            nameDropDown={"VGA"}
                        />
                        <SelectDropDown
                            list={manHinh}
                            setListChecked={setManHinhChecked}
                            nameDropDown={"Màn hình"}
                        />
                        <SelectDropDown
                            list={banPhim}
                            setListChecked={setBanPhimChecked}
                            nameDropDown={"Bàn phím"}
                        />
                        <SelectDropDown
                            list={oCung}
                            setListChecked={setOCungChecked}
                            nameDropDown={"Ổ cứng"}
                        />
                        <SelectDropDown
                            list={mauSac}
                            setListChecked={setmauSacChecked}
                            nameDropDown={"Màu sắc"}
                        />
                        <SelectDropDown
                            list={heDieuHanh}
                            setListChecked={setHeDieuHanhChecked}
                            nameDropDown={"Hệ điều hành"}
                        />
                        <SelectDropDown
                            list={webcam}
                            setListChecked={setWebcamChecked}
                            nameDropDown={"Webcam"}
                        />
                    </div>
                </Paper>
            </div>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 700 }}>STT</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontWeight: 700 }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sanPham
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const rowIndex = filter.page * filter.size + index + 1;
                                    return (
                                        // lặp từng row
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                                            <TableCell align='center'>{rowIndex}</TableCell>
                                            {/* lặp từng cell dựa vào tên cot */}
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === 'hanhDong') {
                                                    const valueTrangThai = row['trangThai'];
                                                    return <TableCell key={column.id} align={column.align}>
                                                        <EditOutlinedIcon onClick={() => handleUpdate(row.id)} />
                                                        {valueTrangThai === 1 ?
                                                            <Switch defaultChecked color="secondary"
                                                                onChange={handleSwitchChange(row.id)}
                                                            />
                                                            :
                                                            <Switch onChange={handleSwitchChange(row.id)} />}
                                                    </TableCell>
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
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
                    count={totalElement}
                    rowsPerPage={parseInt(filter.size)}
                    page={filter.page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            
        </MainCard>
        
        </>
    );
}

export default DanhSachSanPham

