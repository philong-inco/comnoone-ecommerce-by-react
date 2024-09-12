import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useParams } from 'react-router-dom';
import { createBill } from 'services/admin/bill/billService';
import { deleteBillByCode, getBillCodes } from 'services/admin/sell/sellService';
function Sell() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([]);
  const [value, setValue] = useState(null);

  const fetchBillCodes = async () => {
    const response = await getBillCodes();
    if (response.status_code === 200) {
      setTabs(response.data);
    }
  };
  useEffect(() => {
    fetchBillCodes();
    navigate('/ban-hang');
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/ban-hang/hoa-don/${tabs[newValue]}`);
  };

  const handleDelete = async () => {
    if (id) {
      const response = await deleteBillByCode(id);
      if (response.status_code === 204) {
        const newTabs = tabs.filter((tab) => tab !== id);
        setTabs(newTabs);
        if (value >= newTabs.length) {
          setValue(newTabs.length - 1);
        }
      }
    }
  };

  const handleCreateBill = async () => {
    const response = await createBill();
    if (response.status_code === 201) {
      setTabs((prevTabs) => [response.data.ma, ...prevTabs]);
      setValue(0);
      navigate(`/ban-hang/hoa-don/${response.data.ma}`);
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {tab}
                    <ShoppingCartIcon fontSize="small" sx={{ marginLeft: 1 }} />
                    <IconButton onClick={() => handleDelete()} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
            ))}
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'red' }}>
                  <AddIcon onClick={() => handleCreateBill()} fontSize="small" />
                </Box>
              }
            />
          </Tabs>
        </Box>
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', marginTop: '20px', borderRadius: '10px' }}>
          <Toolbar>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              Giỏ hàng
            </Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Thêm sản phẩm
            </Button>
            <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }}>
              Quét Barcode
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
          <img src="/path/to/your/image.png" alt="Mascot" width={150} />
          <Typography variant="h6">Chưa có sản phẩm nào trong giỏ hàng!</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Sell;
