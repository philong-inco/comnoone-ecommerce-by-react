import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useParams } from 'react-router-dom';
import { createBill, getBillByCode } from 'services/admin/bill/billService';
import { deleteBillByCode, getBillCodes } from 'services/admin/sell/sellService';
import { toast } from 'react-toastify';
import { NotificationStatus } from 'utils/notification';

import Cart from './Cart';

function Sell() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState({});
  const [tabs, setTabs] = useState([]);
  const [value, setValue] = useState(null);
  const [showModalProducts, setShowModalProducts] = useState(false);

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

  const fetchBill = async (billCode) => {
    const response = await getBillByCode(billCode);
    if (response.status_code === 200) {
      setBill(response.data);
      console.log('CAlll APi');
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/ban-hang/hoa-don/${tabs[newValue]}`);
    console.log('Code : ', tabs[newValue]);
    if (tabs[newValue]) {
      fetchBill(tabs[newValue]);
    }
  };

  const handleDelete = async (requestTab) => {
    console.log('DATA : ', requestTab);

    if (requestTab) {
      try {
        const response = await deleteBillByCode(requestTab);
        if (response.status_code === 204) {
          const newTabs = tabs.filter((tab) => tab !== requestTab);
          setTabs(newTabs);
          toast.success(NotificationStatus.DELETED);

          // Sửa lại logic điều hướng sau khi xóa
          if (newTabs.length > 0) {
            const newIndex = value >= newTabs.length ? newTabs.length - 1 : value;
            setValue(newIndex);
            navigate(`/ban-hang/hoa-don/${newTabs[newIndex]}`);
          } else {
            setValue(null);
            navigate('/ban-hang');
          }
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra khi xóa hóa đơn');
      }
    }
  };

  const handleShowModalProducts = () => {
    setShowModalProducts(!showModalProducts);
  };

  const handleCancelModalProducts = () => {
    setShowModalProducts(false);
  };

  const handleCreateBill = async () => {
    const response = await createBill();
    if (response.status_code === 201) {
      setTabs((prevTabs) => [response.data.ma, ...prevTabs]);
      setValue(0);
      navigate(`/ban-hang/hoa-don/${response.data.ma}`);
      toast.success(NotificationStatus.CREATED);
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
                    <IconButton onClick={() => handleDelete(tab)} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
            ))}
            <Tab
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    padding: '10px',
                    height: '30px',
                    width: '30px',
                    border: '2px solid #697586'
                  }}
                >
                  <AddIcon onClick={() => handleCreateBill()} sx={{ fontSize: 30 }} />
                </Box>
              }
            />
          </Tabs>
        </Box>
        <Cart bill={bill} />
      </Box>
    </>
  );
}

export default Sell;
