import React from 'react'
import '../../../services/admin/employee/employeeService.js';
import { useNavigate } from 'react-router-dom';
import { searchNhanVienKeyWord } from 'services/admin/employee/employeeService';


function danhSachNhanVien() {
    const [nhanvien, setNhanVien] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchRadio, setSearchRadio] = useState('');
    const [statuses] = useState([
        { id: '', name: 'Tất Cả' },
        { id: '0', name: 'Đã Nghỉ Việc' },
        { id: '1', name: 'Đang Làm Việc' }
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNhanVien = async () => {
            try {
                let result;
                if (searchKeyWord) {
                    result = await searchNhanVienKeyWord(currentPage, searchKeyWord);
                } else if (searchRadio) {
                    result = await searchNhanVienRadio(currentPage, searchRadio);
                } else {
                    result = await getAllNhanVien(currentPage);
                }
                setNhanVien(result.data.content);
                setTotalPages(result.data.totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNhanVien();
    }, [currentPage, searchKeyWord, searchRadio]);


    const getStatusNhanVien = (status) => {
        switch (status) {
            case 0:
                return 'Đã Nghỉ Việc';
            case 1:
                return 'Đang Làm Việc';
            default:
                return 'Chưa Xác Định';
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setCurrentPage(0);
        searchNhanVienKeyWord(0, searchKeyWord).then((result) => {
            setNhanVien(result.data.content);
            setTotalPages(result.data.totalPages);
        });
    };

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSearchRadio(value);
        setCurrentPage(0);
        setSearchKeyWord('');
        searchTrangThai(0, value).then((result) => {
            setNhanVien(result.data.content);
            setTotalPages(result.data.totalPages);
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteNhanVien(id);
            const result = await getAll(currentPage);
            setNhanVien(result.data.content);
            setTotalPages(result.data.totalPages);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleRollback = async (id) => {
        try {
            await rollBackStatus(id);
            const result = await getAll(currentPage);
            setNhanVien(result.data.content);
            setTotalPages(result.data.totalPages);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                    <Item>1</Item>
                </Grid>
                <Grid xs={4} md={2} mdOffset="auto">
                    <Item>2</Item>
                </Grid>
                <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
                    <Item>3</Item>
                </Grid>
                <Grid xs md={6} mdOffset={2}>
                    <Item>4</Item>
                </Grid>
            </Grid>
        </div>
    )
}

export default danhSachNhanVien