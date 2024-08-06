import React from 'react';
import { Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';

function BillTable(props) {
  const { activeKey, handleTabChange, columns, bills, page, pageSize, total, onPageChange } = props;

  const tabList = [
    { key: '', label: 'TẤT CẢ' },
    { key: 'DON_MOI', label: 'Đơn mới' },
    { key: 'CHO_THANH_TOAN', label: 'Chờ thanh toán' },
    { key: 'CHO_XAC_NHAN', label: 'Chờ xác nhận' },
    { key: 'CHO_GIAO', label: 'Chờ giao' },
    { key: 'DANG_GIAO', label: 'Đang giao' },
    { key: 'TRA_HANG_HOAN_TIEN', label: 'Trả hàng hoàn tiền' },
    { key: 'HOAN_THANH', label: 'Hoàn thành' },
    { key: 'HUY', label: 'Hủy' }
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        marginTop: '10px',
        borderRadius: '10px',
        padding: '10px'
      }}
    >
      <Tabs
        value={activeKey}
        onChange={(event, newValue) => handleTabChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabList.map((tab) => (
          <Tab key={tab.key} label={tab.label} value={tab.key} sx={{ marginLeft: '10px' }} />
        ))}
      </Tabs>

      {tabList.map((tab) => (
        <Box key={tab.key} hidden={activeKey !== tab.key} sx={{ marginTop: '20px' }}>
          {activeKey === tab.key && (
            <>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.key}>{column.title}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        {columns.map((column) => (
                          <TableCell key={column.key}>
                            {column.render ? column.render(bill[column.dataIndex], bill) : bill[column.dataIndex]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Pagination
                sx={{ marginTop: '10px', textAlign: 'center' }}
                count={Math.ceil(total / pageSize)}
                page={page}
                onChange={(event, value) => onPageChange(value)}
              />
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default BillTable;
