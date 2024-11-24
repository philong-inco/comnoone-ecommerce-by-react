import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Add, Delete, Edit, Upload } from '@mui/icons-material';
// import TransitionsModal from './components/ModalCreate';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { createSanPham } from 'api/sanpham/sanPham';
import { toast } from 'react-toastify';
import { createSanPhamChiTiet } from 'api/sanpham/chiTietSanPham';
import { excelImportBlank } from '../../../../utils/serialUtil/excelImportBlank';
import { backEndUrl } from '../../../../utils/back-end';
import { useNavigate } from 'react-router-dom';

const ImportSanPham = () => {
    const navigate = useNavigate();
    const columnsSanPham = [
        {
            field: 'index',
            headerName: 'STT',
            width: 70,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.id + 1}
                </div>
            )
        },
        { field: 'ten', headerName: 'Tên Sản Phẩm', width: 130, flex: 1 },
        { field: 'moTa', headerName: 'Mô Tả', width: 130, flex: 1 },
        { field: 'nhuCau', headerName: 'Nhu Cầu', width: 130, flex: 1 },
        { field: 'thuongHieu', headerName: 'Thương Hiệu', width: 130, flex: 1 },
        {
            field: 'actions',
            headerName: 'Thao Tác',
            sortable: false,
            width: 160,
            flex: 1,
            renderCell: (params) => (
                <div>
                    <div style={{ display: 'inline-block' }}>
                        {/* <ModalUpdate fetchRams={fetchRams} info={params.row} /> */}
                    </div>
                    <IconButton color="error" onClick={() => handleDeleteProduct(params.row.ten)}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ];
    const columnsBienThe = [
        {
            field: 'stt',
            headerName: 'STT',
            width: 20,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.id + 1}
                </div>
            )
        },
        {
            field: 'sanPhamInfo',
            headerName: 'Tên Sản Phẩm',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.sanPhamInfo.ten}
                </div>
            )
        },
        {
            field: 'banPhimInfo',
            headerName: 'Bàn Phím',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.banPhimInfo.ten}
                </div>
            )
        },
        {
            field: 'cpuInfo',
            headerName: 'CPU',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.cpuInfo.ten}
                </div>
            )
        },
        {
            field: 'heDieuHanhInfo',
            headerName: 'Hệ Điều Hành',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.heDieuHanhInfo.ten}
                </div>
            )
        },
        {
            field: 'manHinhInfo',
            headerName: 'Màn Hình',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.manHinhInfo.ten}
                </div>
            )
        },
        {
            field: 'ramInfo',
            headerName: 'RAM',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.ramInfo.ten}
                </div>
            )
        },
        {
            field: 'vgaInfo',
            headerName: 'VGA',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.vgaInfo.ten}
                </div>
            )
        },
        {
            field: 'oCungInfo',
            headerName: 'Ổ Cứng',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.oCungInfo.ten}
                </div>
            )
        },
        {
            field: 'webcamInfo',
            headerName: 'Webcam',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.webcamInfo.ten}
                </div>
            )
        },
        {
            field: 'mauSacInfo',
            headerName: 'Màu Sắc',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.mauSacInfo.ten}
                </div>
            )
        },
        {
            field: 'giaBan',
            headerName: 'Giá Bán',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.giaBan}
                </div>
            )
        },
        {
            field: 'serials',
            headerName: 'Serials',
            width: 130,
            flex: 1,
            renderCell: (params) => (
                <div>
                    {params.row.serials}
                </div>
            )
        },
        {
            field: 'actions',
            headerName: 'Thao Tác',
            sortable: false,
            width: 160,
            flex: 1,
            renderCell: (params) => (
                <div>
                    <div style={{ display: 'inline-block' }}>
                        {/* <ModalUpdate fetchRams={fetchRams} info={params.row} /> */}
                    </div>
                    <IconButton color="error" onClick={() => handleDeleteProductDetail(params.row)}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ];

    const fileInputRef = useRef(null);
    const [sanphams, setSanPhams] = useState([]);
    const [bienThes, setBienThes] = useState([]);
    const [isImport, setIsImport] = useState(false);
    const [ram, setRam] = useState([]);
    const [mauSac, setmauSac] = useState([]);
    const [CPU, setCPU] = useState([]);
    const [VGA, setVGA] = useState([]);
    const [webcam, setWebcam] = useState([]);
    const [oCung, setOCung] = useState([]);
    const [manHinh, setManHinh] = useState([]);
    const [heDieuHanh, setHeDieuHanh] = useState([]);
    const [banPhim, setBanPhim] = useState([]);
    const [nhuCau, setNhuCau] = useState([]);
    const [thuongHieu, setThuongHieu] = useState([]);
    const [trangThai, setTrangThai] = useState([
        { id: 1, ten: 'Hoạt động' },
        { id: 0, ten: 'Đã tắt' }
    ]);

    const handleDeleteProduct = (ten) => {
        console.log('ten: ', ten);
        var bienTheTemp = bienThes.filter(x => x.sanPhamInfo.ten != ten);
        setBienThes(bienTheTemp);
        console.log('bienTheTemp: ', bienTheTemp);
        var sanPhamTemp = sanphams.filter(x => x.ten != ten);
        console.log('sanPhamTemp: ', sanPhamTemp);
        setSanPhams(sanPhamTemp);
    }

    const handleDeleteProductDetail = (row) => {
        console.log('row: ', row);
        var bienTheTemp = bienThes.filter(x => x.id != row.id);
        console.log('bienTheTemp: ', bienTheTemp);
        setBienThes(bienTheTemp);
        handleDeleteProductHaveNotBienThe(row);
    }

    const handleDeleteProductHaveNotBienThe = (row) => {
        var exist = bienThes.filter(x => x.tenSanPham == row.tenSanPham && x.id != row.id);
        if (exist.length > 0){
            return;
        } else {
            var sanPhamTemp = sanphams.filter(x => x.ten != row.tenSanPham);
            setSanPhams(sanPhamTemp);
        }
    }


    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            // sheet 1 là san pham
            const sheetProduct = workbook.SheetNames[0];
            const worksheetProduct = workbook.Sheets[sheetProduct];
            const jsonDataProduct = XLSX.utils.sheet_to_json(worksheetProduct); // tạo json từ sheet
            const listNewProduct = jsonDataProduct.map((data, index) => { // map nhu cau va thuong hieu vao
                const nhuCauInfo = nhuCau.find(nc => nc.ten.toLowerCase() === data.nhuCau.toLowerCase())
                const thuongHieuInfo = thuongHieu.find(nc => nc.ten.toLowerCase() === data.thuongHieu.toLowerCase())

                return {
                    ...data,
                    id: index,
                    nhuCauInfo,
                    thuongHieuInfo
                }
            })
            for(const product of listNewProduct){
                if(!product?.nhuCauInfo){
                    alert(`Tên nhu cầu không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!product?.thuongHieuInfo){
                    alert(`Tên thương hiệu không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
            }
            const listNewProductDuplicates = getDuplicateObjects(listNewProduct.map(item => {
                return {
                    ...item,
                    id: 0
                }
            }));
            if(listNewProductDuplicates.length > 0) {
                const array = listNewProductDuplicates.map(item => item.ten);
                alert(`Dữ liệu bị lặp lại ở sản phẩm: ${array.join(', ')}`);
                return;
            }

            // sheet 2 là biến thể
            const sheetBienThe = workbook.SheetNames[1];
            const worksheetBienThe = workbook.Sheets[sheetBienThe];
            const jsonDataBienthe = XLSX.utils.sheet_to_json(worksheetBienThe);

            const listBienThe = jsonDataBienthe.map((bienthe, index) => {
                const banPhimInfo = banPhim.find(banphim => banphim.ten.trim().toLowerCase() === bienthe.tenBanPhim.trim().toLowerCase())
                const cpuInfo = CPU.find(cpu => cpu.ten.trim().toLowerCase() === bienthe.tenCPU.trim().toLowerCase())
                const heDieuHanhInfo = heDieuHanh.find(hdh => hdh.ten.trim().toLowerCase() === bienthe.tenHeDieuHanh.trim().toLowerCase())
                const manHinhInfo = manHinh.find(mh => mh.ten.trim().toLowerCase() === bienthe.tenManHinh.trim().toLowerCase())
                const mauSacInfo = mauSac.find(ms => ms.ten.trim().toLowerCase() === bienthe.tenMauSac.trim().toLowerCase())
                const ramInfo = ram.find(r => r.ten.trim().toLowerCase() === bienthe.tenRam.trim().toLowerCase())
                const vgaInfo = VGA.find(v => v.ten.trim().toLowerCase() === bienthe.tenVGA.trim().toLowerCase())
                const webcamInfo = webcam.find(cam => cam.ten.trim().toLowerCase() === bienthe.tenWebcam.trim().toLowerCase())
                const oCungInfo = oCung.find(rom => rom.ten.trim().toLowerCase() === bienthe.tenOCung.trim().toLowerCase())
                const sanPhamInfo = listNewProduct.find(product => product.ten.toLowerCase() === bienthe.tenSanPham.trim().toLowerCase())
                const giaBan = bienthe.giaBan
                const serials = bienthe.serials

                const id = index

                return {
                    id,
                    banPhimInfo,
                    cpuInfo,
                    heDieuHanhInfo,
                    manHinhInfo,
                    mauSacInfo,
                    ramInfo,
                    vgaInfo,
                    webcamInfo,
                    oCungInfo,
                    sanPhamInfo,
                    giaBan,
                    serials,
                    tenSanPham: bienthe.tenSanPham
                }
            });

            let isNotMatchProductName = false;
            for(const bienthe of listBienThe){
                if(!bienthe?.sanPhamInfo){
                    alert(`Tên sản phẩm "${bienthe.tenSanPham}" ở mục BIẾN THỂ không khớp`)
                    isNotMatchProductName = true;
                    return;
                }
                if(!bienthe?.banPhimInfo){
                    alert(`Tên bàn phím không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.cpuInfo){
                    alert(`Tên CPU không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.heDieuHanhInfo){
                    alert(`Tên hệ điều hành không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.manHinhInfo){
                    alert(`Tên màn hình không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.mauSacInfo){
                    alert(`Tên màu sắc không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.ramInfo){
                    alert(`Tên RAM không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.vgaInfo){
                    alert(`Tên VGA không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.webcamInfo){
                    alert(`Tên Webcam không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
                if(!bienthe?.oCungInfo){
                    alert(`Tên ổ cứng không tồn tại hoặc không còn được sử dụng`)
                    return;
                }
            }

            if(isNotMatchProductName){
            }

            const listBienTheDuplicates = getDuplicateObjects(listBienThe.map(item => {
                return {
                    ...item,
                    id: 0
                }
            }));
            if(listBienTheDuplicates.length > 0) {
                const array = listBienTheDuplicates.map(item => item.sanPhamInfo.ten);

                alert(`Dữ liệu bị lặp lại ở biến thể có tên sản phẩm là: ${array.join(', ')}`)
                return;
            }
            
            setSanPhams(listNewProduct);
            setBienThes(listBienThe);
            setIsImport(true);
        };

        fileInputRef.current.value = null;
        reader.readAsArrayBuffer(file);
    };

    const loadFilterOptions = async () => {
        // get các bảng
        const nhuCauResult = await axios.get(`${backEndUrl}/nhu-cau/all-list-active`);
        const thuongHieuResult = await axios.get(`${backEndUrl}/thuong-hieu/all-list-active`);
        const ramResult = await axios.get(`${backEndUrl}/ram/all-list-active`);
        const mauSacResult = await axios.get(`${backEndUrl}/mau-sac/all-list-active`);
        const cpuResult = await axios.get(`${backEndUrl}/cpu/all-list-active`);
        const vgaResult = await axios.get(`${backEndUrl}/vga/all-list-active`);
        const webcamResult = await axios.get(`${backEndUrl}/webcam/all-list-active`);
        const oCungResult = await axios.get(`${backEndUrl}/o-cung/all-list-active`);
        const manHinhResult = await axios.get(`${backEndUrl}/man-hinh/all-list-active`);
        const heDieuHanhResult = await axios.get(`${backEndUrl}/he-dieu-hanh/all-list-active`);
        const banPhimResult = await axios.get(`${backEndUrl}/ban-phim/all-list-active`);

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

    // hàm add sản phẩm
    const addMultiProduct = async () => {
        const requests = sanphams.map(item => {
            return createSanPham({
                moTa: item.moTa,
                nhuCauId: item.nhuCauInfo.id,
                ten: item.ten,
                thuongHieuId: item.thuongHieuInfo.id,
                trangThai: 1
            });
        });

        const results = await Promise.allSettled(requests);
        let errorListNoti = [];
        let successListNoti = [];
        const successList = [];
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                const response = result.value;
                if (!response) {
                    errorListNoti.push(index + 1)
                    if (index === results.length - 1) {
                        // Thông báo khi code 999
                        alert(`Sản phẩm thứ ${errorListNoti.join(', ')} đã tồn tại`);
                    }
                } else {
                    successListNoti.push(index + 1);
                    successList.push(response)

                    if ((index === results.length - 1)) {
                        // alert(`Sản phẩm thứ ${successListNoti.join(', ')} đã thêm thành công`);
                    }
                }
            } else if (result.status === 'rejected') {
                // Thông báo khi promise bị rejected
                alert(`Thêm sản phẩm thứ ${index + 1} thất bại: ${result.reason.message || result.reason}`);
            }
        });
        
        const requestsBienThe = bienThes.map(item => {
            for(const response of successList) {
                if(response.ten === item.sanPhamInfo.ten){
                    return createSanPhamChiTiet({
                        banPhimId: item.banPhimInfo.id,
                        cpuId: item.cpuInfo.id,
                        heDieuHanhId: item.heDieuHanhInfo.id,
                        manHinhId: item.manHinhInfo.id,
                        mauSacId: item.mauSacInfo.id,
                        ocungId: item.oCungInfo.id,
                        ramId: item.ramInfo.id,
                        sanPhamId: response.id,
                        vgaId: item.vgaInfo.id,
                        webcamId: item.webcamInfo.id,
                        giaBan: item.giaBan,
                        listUrlAnhSanPham: '',
                        listSerialNumber: item.serials,
                        trangThai: 1
                    });
                }
            }
        });

        errorListNoti = [];
        successListNoti = [];
        const resultsBienThe = await Promise.allSettled(requestsBienThe);
        resultsBienThe.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                const response = result.value;
                if (!response) {
                    errorListNoti.push(index + 1)
                    if (index === results.length - 1) {
                        // Thông báo khi code 999
                        alert(`Biến thể thứ ${errorListNoti.join(', ')} đã tồn tại`);
                    }
                } else {
                    successListNoti.push(index + 1);

                    if ((index === resultsBienThe.length - 1)) {
                        // alert(`Biến thể thứ ${successListNoti.join(', ')} đã thêm thành công`);
                    }
                }
            } else if (result.status === 'rejected') {
                // Thông báo khi promise bị rejected
                alert(`Thêm Biến thể thứ ${index + 1} thất bại: ${result.reason.message || result.reason}`);
            }
        });
        return resultsBienThe;
    };

    const [messCheck, setMessCheck] = useState('');
    useEffect(()=>{
        if(messCheck !== ''){
            alert(messCheck);
        }
    }, [messCheck])
    const handleAddMultiProduct = async () => {
        if (await validateBeforeAddMultiProduct()) {
            console.log('validateBeforeAddMultiProduct: hợp lệ');
            await toast.promise(
                addMultiProduct(),
                {
                    pending: 'Đang thêm sản phẩm...',
                    error: 'Có lỗi xảy ra, vui lòng thử lại 🤯'
                }
            );
            navigate(`/sanpham/danhsach`);
        }
        
        
    };

    const validateBeforeAddMultiProduct = async () => {
        let mess = '';
        let isValid = true;
        // check tên sản phẩm trùng trong DB
        const seriTotal = [];
        const tenSPTotal = [];
        let seriLengtInvalid = '';
        let seriTonTai = '';
        let tenSPTrung = '';
        let giaSai = '';
        
        for(let i = 0; i < sanphams.length; i++){
            tenSPTotal.push(sanphams[i].ten);
            if((await axios.get(`${backEndUrl}/san-pham/exist-name?name=${sanphams[i].ten}`)).data.data){
                tenSPTrung += `${sanphams[i].ten}, `;
                isValid = false;
            }
            let bienThe = bienThes.filter(x => x.tenSanPham == sanphams[i].ten);
            
            
            for (let j = 0; j < bienThe.length; j++){
                if (!(bienThe[j].giaBan !== '' && /^(0|[1-9]\d*)(\.\d+)?$/.test(bienThe[j].giaBan))){
                    giaSai += `${bienThe.tenSanPham}, `;
                    isValid = false;
                }
                let serialsTemp = (bienThe[j].serials + '').split(',').map(x => x.trim());
                for(let k = 0; k < serialsTemp.length; k++){
                    seriTotal.push(serialsTemp[k]);
                    if (serialsTemp[k].length < 7 || serialsTemp[k].length > 20 || serialsTemp[k].includes(" ")){
                        seriLengtInvalid += `${serialsTemp[k]}, `
                        isValid = false;
                    }
                    if ((await axios.get(`${backEndUrl}/serial-number/exist-for-add?ma=${serialsTemp[k]}`)).data.data){
                        seriTonTai += `${serialsTemp[k]}, `
                        isValid = false;
                    }
                }
                

            }
        }
        const tenSPTotalCheck = new Set(tenSPTotal);
        if(tenSPTotalCheck.size !== tenSPTotal.length){
            mess += `Tên sản phẩm trong excel bị trùng lặp, `
            isValid = false;
        }
        if (tenSPTrung !== ''){
            mess += "Sản phẩm đã tồn tại: " + tenSPTrung;
        }
        if (seriLengtInvalid !== ''){
            mess += 'Độ dài serial không nằm trong khoảng 7-20 ký tự (không chứa dấu cách): ' + seriLengtInvalid;
        }
        if (seriTonTai !== ''){
            mess += "Serial đã tồn tại: " + seriTonTai;
        }
        
        const seriTotalCheck = new Set(seriTotal);
        if(seriTotalCheck.size !== seriTotal.length){
            mess += `Serial trong excel bị trùng lặp, `
            isValid = false;
        }
        if (giaSai !== ''){
            mess += `Giá không hợp lệ tại sản phẩm: ${giaSai}, `;
        }
        let mess1 = mess.substring(0, mess.length-2)
        setMessCheck(mess1);
        return isValid;
        
    }

    const getDuplicateObjects = (array) => {
        const duplicates = [];
        const seen = new Set();

        array.forEach((obj) => {
            const serializedObj = JSON.stringify(obj);

            if (seen.has(serializedObj)) {
                duplicates.push(obj); // Nếu object đã tồn tại trong set, thêm vào mảng duplicates
            } else {
                seen.add(serializedObj); // Thêm object vào set để kiểm tra sau
            }
        });

        return duplicates;
    };

    useEffect(() => {
        loadFilterOptions();
    }, [])

    return (
        <div>
            <div>
                <MainCard title="Import Sản phẩm của bạn">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            <Button
                            size="medium"
                            style={{ background: "#2196F3", color: "#fff", padding: "5px 20px", marginRight: "20px" }}
                            onClick={() => excelImportBlank("Template")}>Tải mẫu xuống</Button>
                        </div>
                        <Button
                            size="medium"
                            onClick={handleButtonClick}
                            style={{ background: "#673ab7", color: "#fff", padding: "5px 20px" }}>
                            Tải lên <Upload />
                            <input
                                hidden
                                type="file"
                                accept=".xlsx, .xls"
                                ref={fileInputRef}
                                onInput={(e) => handleFileUpload(e)}
                            />
                        </Button>
                    </div>
                </MainCard>
            </div>
            {
                isImport &&
                <div style={{ marginTop: "20px" }}>
                    <MainCard title="Danh Sách Sản Phẩm">
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={sanphams}
                                columns={columnsSanPham}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 20]}
                            />
                        </div>
                    </MainCard>
                    <MainCard title="Danh Sách Biến Thể" style={{ marginTop: "20px" }}>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={bienThes}
                                columns={columnsBienThe}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 20]}
                            />
                        </div>
                    </MainCard>

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "end", marginRight: "30px" }}>
                        <Button
                            style={{ background: "#673ab7", color: "#fff", padding: "5px 20px" }}
                            onClick={handleAddMultiProduct}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>

            }
        </div>
    );
}

export default ImportSanPham;

