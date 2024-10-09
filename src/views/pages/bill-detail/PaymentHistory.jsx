// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Paper, Box, Grid } from '@mui/material';

// function PaymentHistory(props) {
//   const { billHistory } = props;

//   const columns = [
//     { id: 'amount', label: 'Số tiền' },
//     { id: 'paymentDate', label: 'Ngày thanh toán' },
//     { id: 'paymentMethod', label: 'PTTT' },
//     { id: 'status', label: 'Trạng Thái' },
//     { id: 'confirmedBy', label: 'Người xác nhận' }
//   ];

//   const renderStatus = (status) => {
//     let color = status === 'completed' ? 'success' : 'error';
//     return <Chip label={status} color={color} sx={{ textTransform: 'uppercase' }} />;
//   };

//   return (
//     <>
//       <Grid sx={{ backgroundColor: 'white', marginTop: 2, padding: 2, borderRadius: 2 }}>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.id}>{column.label}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {billHistory.map((row, index) => (
//                 <TableRow key={index}>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>{column.id === 'status' ? renderStatus(row[column.id]) : row[column.id]}</TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>

//       <Grid container spacing={2} padding={2} sx={{ backgroundColor: 'white', marginTop: 1, borderRadius: 4 }}>
//         Lịch sử thanh toán ở đây
//       </Grid>
//     </>
//   );
// }

// export default PaymentHistory;
