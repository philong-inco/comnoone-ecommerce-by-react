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



const ImportSanPham = () => {
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
                    <IconButton color="error" onClick={() => handleDelete(params.id)}>
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
            width: 70,
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
                    <IconButton color="error" onClick={() => handleDelete(params.id)}>
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
            const jsonDataProduct = XLSX.utils.sheet_to_json(worksheetProduct);
            const listNewProduct = jsonDataProduct.map((data, index) => {
                const nhuCauInfo = nhuCau.find(nc => nc.ten.toLowerCase() === data.nhuCau.toLowerCase())
                const thuongHieuInfo = thuongHieu.find(nc => nc.ten.toLowerCase() === data.thuongHieu.toLowerCase())

                return {
                    ...data,
                    id: index,
                    nhuCauInfo,
                    thuongHieuInfo
                }
            })
            const listNewProductDuplicates = getDuplicateObjects(listNewProduct.map(item => {
                return {
                    ...item,
                    id: 0
                }
            }));
            if(listNewProductDuplicates.length > 0) {
                const array = listNewProductDuplicates.map(item => item.ten);
                toast.error(`Dữ liệu bị lặp lại ở sản phẩm: ${array.join(', ')}`)
                return;
            }

            // sheet 2 là biến thể
            const sheetBienThe = workbook.SheetNames[1];
            const worksheetBienThe = workbook.Sheets[sheetBienThe];
            const jsonDataBienthe = XLSX.utils.sheet_to_json(worksheetBienThe);

            const listBienThe = jsonDataBienthe.map((bienthe, index) => {
                const banPhimInfo = banPhim.find(banphim => banphim.ten.toLowerCase() === bienthe.tenBanPhim.toLowerCase())
                const cpuInfo = CPU.find(cpu => cpu.ten.toLowerCase() === bienthe.tenCPU.toLowerCase())
                const heDieuHanhInfo = heDieuHanh.find(hdh => hdh.ten.toLowerCase() === bienthe.tenHeDieuHanh.toLowerCase())
                const manHinhInfo = manHinh.find(mh => mh.ten.toLowerCase() === bienthe.tenManHinh.toLowerCase())
                const mauSacInfo = mauSac.find(ms => ms.ten.toLowerCase() === bienthe.tenMauSac.toLowerCase())
                const ramInfo = ram.find(r => r.ten.toLowerCase() === bienthe.tenRam.toLowerCase())
                const vgaInfo = VGA.find(v => v.ten.toLowerCase() === bienthe.tenVGA.toLowerCase())
                const webcamInfo = webcam.find(cam => cam.ten.toLowerCase() === bienthe.tenWebcam.toLowerCase())
                const oCungInfo = oCung.find(rom => rom.ten.toLowerCase() === bienthe.tenOCung.toLowerCase())
                const sanPhamInfo = listNewProduct.find(product => product.ten.toLowerCase() === bienthe.tenSanPham.toLowerCase())
                const giaBan = bienthe.giaBan
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
                    tenSanPham: bienthe.tenSanPham
                }
            });

            let isNotMatchProductName = false;
            for(const bienthe of listBienThe){
                if(!bienthe?.sanPhamInfo){
                    toast.error(`Tên sản phẩm "${bienthe.tenSanPham}" ở mục BIẾN THỂ không khớp`)
                    isNotMatchProductName = true;
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
                toast.error(`Dữ liệu bị lặp lại ở biến thể có tên sản phẩm là: ${array.join(', ')}`)
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
                        toast.error(`Sản phẩm thứ ${errorListNoti.join(', ')} đã tồn tại`);
                    }
                } else {
                    successListNoti.push(index + 1);
                    successList.push(response)

                    if ((index === results.length - 1)) {
                        toast.success(`Sản phẩm thứ ${successListNoti.join(', ')} đã thêm thành công`);
                    }
                }
            } else if (result.status === 'rejected') {
                // Thông báo khi promise bị rejected
                toast.error(`Thêm sản phẩm thứ ${index + 1} thất bại: ${result.reason.message || result.reason}`);
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
                        toast.error(`Biến thể thứ ${errorListNoti.join(', ')} đã tồn tại`);
                    }
                } else {
                    successListNoti.push(index + 1);

                    if ((index === resultsBienThe.length - 1)) {
                        toast.success(`Biến thể thứ ${successListNoti.join(', ')} đã thêm thành công`);
                    }
                }
            } else if (result.status === 'rejected') {
                // Thông báo khi promise bị rejected
                toast.error(`Thêm Biến thể thứ ${index + 1} thất bại: ${result.reason.message || result.reason}`);
            }
        });

        return resultsBienThe;
    };


    const handleAddMultiProduct = async () => {
        await toast.promise(
            addMultiProduct(),
            {
                pending: 'Đang thêm sản phẩm...',
                error: 'Có lỗi xảy ra, vui lòng thử lại 🤯'
            }
        );
    };

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

