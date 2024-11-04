import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Paper,
  Grid,
  Button,
  Slider,
  TextField,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, subMonths } from 'date-fns';
import { getAllListProduct, getTopFiveProductSold, infoBillByDate, totalPriceToday, totalpriceByDate, countBill, countProduct } from '../../services/admin/product/productService.js';
import { trangThaiHoaDonCalulate } from '../../services/admin/product/productService.js'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState(new Date());
  const rowsPerPage = 5;
  const [revenue, setRevenue] = useState(0);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalBill, setTotalBill] = useState(null);
  const [totalBillToday, settotalBillToday] = useState(null);
  const [totalProduct, setTotalProduct] = useState(null);
  const [totalPrecentBill, settotalPrecentBill] = useState(null);

  useEffect(() => {
    loadProducts();
    loadTopSellingProducts();
    fetchRevenue();
    handleCountBillByDate();
    handleCountProductSoldOutByDate();
    handleBillByToDay();
    handleCalculateBillPercentage();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      handleFetchTotalPrice();
      handleCountBillByDate();
      handleCountProductSoldOutByDate();
      handleCalculateBillPercentage();
    }
  }, [startDate, endDate]);

  const fetchRevenue = async () => {
    const result = await totalPriceToday();
    setRevenue(result.data?.data || 0);
  };
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD1', 
    '#FF4560', '#33FF33', '#FF33FF', '#FF6633', '#33CCFF'
  ];

  const mapOrderStatus = (status) => {
    switch (status) {
      case 0:
        return "Đơn mới";
      case 2:
        return "Chờ xác nhận";
      case 3:
        return "Chờ lấy hàng";
      case 4:
        return "Đang vận chuyển";
      case 6:
        return "Hoàn thành";
      case 7:
        return "Hủy";
      case 9:
        return "Xác nhận";
      case 11:
        return "Hóa đơn chờ";
      default:
        return "Khác";
    }
  };

  const loadProducts = async () => {
    try {
      const result = await getAllListProduct(startDate, endDate);
      const filteredProducts = result.data
        .filter((product) => product.soLuong > 0 && product.soLuong <= 5 && product.trangThai === 1)
        .sort((a, b) => a.soLuong - b.soLuong);
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTopSellingProducts = async () => {
    try {
      const today = new Date();
      const startDate = subMonths(today, 1);
      const endDate = today;

      const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');

      const result = await getTopFiveProductSold(formattedStartDate, formattedEndDate);
      setTopSellingProducts(result.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm bán chạy nhất:", error);
    }
  };

  const loadChartData = async () => {
    try {
      const result = await infoBillByDate(
        format(startDate, 'yyyy-MM-dd HH:mm:ss'),
        format(endDate, 'yyyy-MM-dd HH:mm:ss')
      );

      const formattedData = result.data.map((item) => ({
        date: format(new Date(item.ngayThanhToan), 'dd/MM/yyyy'),
        quantity: item.tongHoaDon,
        soldQuantity: item.tongSanPham,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
    }
  };

  const handleFetchTotalPrice = async () => {
    if (startDate && endDate) {
      try {
        const result = await totalpriceByDate(
          format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss'));
        setTotalPrice(result.data);
      } catch (error) {
        console.error('Lỗi khi lấy tổng doanh thu:', error);
        setTotalPrice(0);
      }
    }
  };

  const handleCountBillByDate = async () => {
    if (startDate && endDate) {
      try {
        const result = await countBill(format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss'));
        setTotalBill(result.data);
      } catch (error) {
        console.error('Lỗi khi lấy tổng hóa đơn:', error);
        setTotalBill(0);
      }
    }
  };

  const handleBillByToDay = async () => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    try {
      const result = await countBill(
        format(startDate, 'yyyy-MM-dd HH:mm:ss'),
        format(endDate, 'yyyy-MM-dd HH:mm:ss')
      );
      settotalBillToday(result.data);
    } catch (error) {
      console.error('Lỗi khi lấy tổng hóa đơn:', error);
      setTotalBill(0);
    }
  };

  const handleCountProductSoldOutByDate = async () => {
    if (startDate && endDate) {
      try {
        const result = await countProduct(format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss'));
        setTotalProduct(result.data);
      } catch (error) {
        console.error('Lỗi khi lấy tổng sản phẩm đã bán:', error);
        setTotalBill(0);
      }
    }
  };

  const handleCalculateBillPercentage = async () => {
    if (startDate && endDate) {
      try {
        const result = await trangThaiHoaDonCalulate(format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss'));
        settotalPrecentBill(result.data);
      } catch (error) {
        console.error('Lỗi khi lấy % trạng thái đơn hàng:', error);
        setTotalBill(0);
      }
    }
  };

  useEffect(() => {
    loadChartData();
  }, [startDate, endDate]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card
                sx={{
                  padding: 3,
                  background: 'linear-gradient(#0250c5, #d43f8d)',
                  color: '#fff',
                  borderRadius: '8px',
                  width: '30%',
                  marginRight: '10%',
                }}
              >
                <Box textAlign="center">
                  <AttachMoneyIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom color="white">
                    Doanh Thu Hôm Nay
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="white">
                    {revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </Typography>
                </Box>
              </Card>

              <Card
                sx={{
                  padding: 3,
                  background: 'linear-gradient(#0250c5, #d43f8d)',
                  color: '#fff',
                  borderRadius: '8px',
                  width: '30%',
                  marginRight: '10%',
                }}
              >
                <Box textAlign="center">
                  <ReceiptIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom color="white">
                    Tổng Hóa Đơn Ngày Hôm Nay
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="white">
                    {totalBillToday !== null
                      ? totalBillToday
                      : '0'}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, mt: 5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1,
                background: 'gray',
                borderRadius: '8px',
                color: '#fff',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography sx={{ marginRight: 2, fontWeight: 'bold' }}>Từ ngày</Typography>
              <TextField
                type="date"
                value={format(startDate, 'yyyy-MM-dd')}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                sx={{
                  marginRight: 2,
                  padding: '5px',
                  borderRadius: '6px',
                  background: '#fff',
                  color: '#333',
                  fontWeight: 'bold',
                  width: '150px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'transparent' },
                  },
                }}
              />

              <Typography sx={{ marginRight: 2, fontWeight: 'bold' }}>Đến ngày</Typography>
              <TextField
                type="date"
                value={format(endDate, 'yyyy-MM-dd')}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                sx={{
                  padding: '5px',
                  borderRadius: '6px',
                  background: '#fff',
                  color: '#333',
                  fontWeight: 'bold',
                  width: '150px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'transparent' },
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
            }}
          >
            <Card
              sx={{
                padding: 3,
                background: 'linear-gradient(#6C8CBF,#96D7C6)',
                color: '#fff',
                borderRadius: '8px',
                width: '48%',
              }}
            >
              <Box textAlign="center">
                <AttachMoneyIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom color="white">
                  Tổng doanh thu
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="white">
                  {totalPrice !== null
                    ? totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Vui lòng chọn khoảng thời gian'}
                </Typography>
              </Box>
            </Card>
            <Card
              sx={{
                padding: 3,
                background: 'linear-gradient(#706695,#F8956F)',
                color: '#fff',
                borderRadius: '8px',
                width: '48%',
              }}
            >
              <Box textAlign="center">
                <ReceiptIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom color="white">
                  Tổng hóa đơn
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="white">
                  {totalBill !== null
                    ? totalBill
                    : 'Vui lòng chọn khoảng thời gian'}
                </Typography>
              </Box>
            </Card>
            <Card
              sx={{
                padding: 3,
                background: 'linear-gradient(#FB7B8E,#031B88)',
                color: '#fff',
                borderRadius: '8px',
                width: '48%',
              }}
            >
              <Box textAlign="center">
                <ShoppingCartIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" gutterBottom color="white">
                  Tổng sản phẩm đã bán
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="white">
                  {totalProduct !== null
                    ? totalProduct
                    : 'Vui lòng chọn khoảng thời gian'}
                </Typography>
              </Box>
            </Card>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
            <Card sx={{ padding: 3, maxWidth: '90%', width: '100%', backgroundColor: '#f5f5f5' }}>
              <Typography variant="h4" gutterBottom align="center">
                Biểu Đồ Thống Kê
              </Typography>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorQuantity" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#0250c5', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#d43f8d', stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="colorOrders" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ff7300', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#ff0057', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === 'soldQuantity') return [`${value}`, 'Số lượng sản phẩm'];
                        if (name === 'quantity') return [`${value}`, 'Số hóa đơn'];
                        return value;
                      }}
                      labelFormatter={(label) => `Ngày: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="soldQuantity" fill="url(#colorQuantity)" name="Số lượng sản phẩm đã bán" />

                    <Bar dataKey="quantity" fill="url(#colorOrders)" name="Số hóa đơn" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center">
                  Không có dữ liệu để hiển thị.
                </Typography>
              )}
            </Card>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Thống kê trạng thái đơn hàng
      </Typography>
      {totalPrecentBill.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={totalPrecentBill}
              dataKey="tiLeTrangThaiHoaDon"
              nameKey="trangThaiHoaDon"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ trangThaiHoaDon, percent }) =>
                `${mapOrderStatus(trangThaiHoaDon)}: ${(percent * 100).toFixed(2)}%`
              }
            >
              {totalPrecentBill.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Legend
              formatter={(value) => mapOrderStatus(parseInt(value, 10))}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          Không có dữ liệu để hiển thị.
        </Typography>
      )}
    </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ padding: 2, minHeight: 385, background: 'linear-gradient(to right,#a6c0fe,#f68084)', color: '#fff' }}>
                <Typography variant="h5" gutterBottom textAlign="center">
                  Sản phẩm sắp hết hàng
                </Typography>
                {products.length > 0 ? (
                  <>
                    <TableContainer component={Paper} sx={{ background: 'transparent' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={{ color: '#fff' }}>Thương Hiệu</TableCell>
                            <TableCell align="center" sx={{ color: '#fff' }}>Tên Sản Phẩm</TableCell>
                            <TableCell align="center" sx={{ color: '#fff' }}>Số Lượng Còn Lại</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {paginatedProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell align="center" sx={{ color: '#fff' }}>{product.thuongHieu}</TableCell>
                              <TableCell align="center" sx={{ color: '#fff' }}>{product.ten}</TableCell>
                              <TableCell align="center" sx={{ color: '#fff' }}>{product.soLuong}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Pagination
                      count={Math.ceil(products.length / rowsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                    />
                  </>
                ) : (
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    Không có sản phẩm nào thỏa mãn điều kiện.
                  </Typography>
                )}
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ padding: 2, minHeight: 300, background: 'linear-gradient(to right,#a6c0fe,#f68084)', color: '#fff' }}>
                <Typography variant="h5" gutterBottom textAlign="center">
                  Top 5 Sản Phẩm Bán Chạy
                </Typography>
                {topSellingProducts.length > 0 ? (
                  <TableContainer component={Paper} sx={{ background: 'transparent' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={{ color: '#fff' }}>Tên Sản Phẩm</TableCell>
                          <TableCell align="center" sx={{ color: '#fff' }}>Số Lượng Đã Bán</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topSellingProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell align="center" sx={{ color: '#fff' }}>{product.productName}</TableCell>
                            <TableCell align="center" sx={{ color: '#fff' }}>{product.totalSerialSold}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    Không có dữ liệu cho sản phẩm bán chạy.
                  </Typography>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
