import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        if (searchKeyWord) {
            searchNhanVien(0, searchKeyWord);
        } else if (searchRadio) {
            searchTrangThai(0, searchRadio);
        } else {
            loadDataNhanVien(currentPage);
        }
    }, [currentPage, searchKeyWord, searchRadio]);


    return (
        <div>danhSachNhanVien</div>
    )
}

export default danhSachNhanVien