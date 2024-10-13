import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import TransitionsModal from './components/ModalCreate';
import { useEffect, useState } from 'react';
import { deleteRam, getRams } from 'api/sanpham/manHinh';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification';
import Swal from 'sweetalert2';
import ModalUpdate from './components/ModalUpdate';



const DanhSachManHinh = () => {
  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      width: 70,
      flex: 1,
    },
    { field: 'ma', headerName: 'Mã', width: 130, flex: 1 },
    { field: 'ten', headerName: 'Tên Màn Hình', width: 130, flex: 1 },
    {
      field: 'doPhanGiai',
      headerName: 'Độ Phân Giải',
      flex: 1,
    },
    { field: 'kichThuoc', headerName: 'Kích Thước', width: 130, flex: 1 },
    {
      field: 'actions',
      headerName: 'Thao Tác',
      sortable: false,
      width: 160,
      flex: 1,
      renderCell: (params) => (
        <div>
          <div style={{display: 'inline-block'}}>
            <ModalUpdate fetchRams={fetchRams} info={params.row}/>
          </div>
          <IconButton color="error" onClick={() => handleDelete(params.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  const [rams, setRams] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRam, setTotalRam] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchRams();
  }, [page]);

  const fetchRams = async () => {
    try {
      setIsLoading(true);

      const res = await getRams({ page, size: 5 });

      setIsLoading(false);

      if (res.status === 200) {
        setRams(res.data.data.map((ram, index) => ({ ...ram, index: index + page * 5 + 1 })));

        setTotalRam(parseInt(res.data.totalElement))

        setTotalPage(parseInt(res.data.totalPage));
      } else {
        toast.error('Error loading data');
      }
    } catch (error) {
      toast.error('Error loading data');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9c27b0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteRam({id});
        
        if (res && res.data.code === 200) {
          toast.success(NotificationStatus.DELETED)
          fetchRams()
        } else {
          toast.error(NotificationStatus.ERROR)
        }
      }
    });

  }

  return (
    <div>
      <MainCard title="Danh sách Màn Hình">
        <div className="mb-5 flex" style={{ justifyContent: "space-between", alignItems: 'center' }}>
          <div className="flex gap-3">
            <TextField label="Tìm RAM" style={{ width: '300px' }} />
            <Button className="btn rounded-lg">Làm mới</Button>
          </div>
          <div className="flex gap-3">
            <FormControl fullWidth>
              <InputLabel id="status">Trạng Thái</InputLabel>
              <Select
                labelId="status"
                id="status"
                label="Trạng Thái"
                className="w-[300px]"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ width: '400px' }}>
              <InputLabel id="display">Hiển thị</InputLabel>
              <Select
                labelId="display"
                id="display"
                label="Hiển thị"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <TransitionsModal fetchRams={fetchRams} />
          </div>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rams}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            onPaginationModelChange={({ page }) => setPage(page)}
            rowCount={totalRam}
            paginationMode="server"
            loading={isLoading}
          />
        </div>
      </MainCard>
    </div>
  );
}

export default DanhSachManHinh;

