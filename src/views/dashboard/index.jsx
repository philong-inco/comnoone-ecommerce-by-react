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
  Select,
  TextField, MenuItem
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, subMonths } from 'date-fns';
import { getAllListProduct, getTopFiveProductSold, infoBillByDate, totalPriceToday, totalpriceByDate, countBill, countProduct, countCustomerByDate } from '../../services/admin/product/productService.js';
import { trangThaiHoaDonCalulate } from '../../services/admin/product/productService.js'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
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
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [searchOption, setSearchOption] = useState('day');
  const [totalPriceLastMonth, setTotalPriceLastMonth] = useState(null);
  const [totalPriceMounthNow, setTotalPriceMounthNow] = useState(null);
  const [growthPercentage, setGrowthPercentage] = useState(null);
  const [totalBillLastMonth, setTotalBillLastMonth] = useState(null);
  const [totalBillMounthNow, setTotalBillMounthNow] = useState(null);
  const [growthPercentageBill, setGrowthPercentageBill] = useState(null);
  const [customerMounth, setCustomerMounth] = useState(null);
  const [customerPreviousMonth, setCustomerPreviousMonth] = useState(null);
  const [growthPercentageCustomer, setGrowthPercentageCustomer] = useState(null);

  useEffect(() => {
    loadProducts();
    loadTopSellingProducts();
    fetchRevenue();
    handleCountBillByDate();
    handleCountProductSoldOutByDate();
    handleBillByToDay();
    handleCalculateBillPercentage();
    handleTotalPriceByMonth();
    handleTotalPriceLastMonth();
    handleTotalBillByMonth();
    handleTotalBillLastMonth();
    handleCountCustomerByMounthNow();
    handleCountCustomerByPreviousMonth();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      handleCountBillByDate();
      handleCountProductSoldOutByDate();
      handleCalculateBillPercentage();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    handleFetchTotalPrice();
    handleCountBillByDate();
    handleCountProductSoldOutByDate();
    loadChartData();
    handleCalculateBillPercentage();
  }, [searchOption, startDate, endDate, month, year]);

  const fetchRevenue = async () => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    try {
      const result = await totalpriceByDate(
        format(startDate, 'yyyy-MM-dd HH:mm:ss'),
        format(endDate, 'yyyy-MM-dd HH:mm:ss')
      );
      debugger;
      setRevenue(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy doanh thu:", error);
      setRevenue(0);
    }
  };

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DD1',
    '#FF4560', '#33FF33', '#FF33FF', '#FF6633', '#33CCFF'
  ];


  useEffect(() => {
    handleTotalPriceByMonth();
    handleTotalPriceLastMonth();
    handleTotalBillByMonth();
    handleTotalBillLastMonth();
  }, []);

  useEffect(() => {
    const calculateGrowthPercentage = () => {
      if (totalPriceLastMonth > 0) {
        const growth = ((totalPriceMounthNow - totalPriceLastMonth) / totalPriceLastMonth) * 100;
        setGrowthPercentage(growth);
      } else {
        setGrowthPercentage(null);
      }
    };
    calculateGrowthPercentage();
  }, [totalPriceMounthNow, totalPriceLastMonth]);


  useEffect(() => {
    const calculateGrowthPercentageBill = () => {
      if (totalPriceLastMonth > 0) {
        const growth = ((totalBillMounthNow - totalBillLastMonth) / totalBillLastMonth) * 100;
        setGrowthPercentageBill(growth);
      } else {
        setGrowthPercentageBill(null);
      }
    };
    calculateGrowthPercentageBill();
  }, [totalBillMounthNow, totalBillLastMonth]);

  useEffect(() => {
    const calculateGrowthPercentageCustomer = () => {
      if (customerPreviousMonth > 0) {
        const growth = ((customerMounth - customerPreviousMonth) / customerPreviousMonth) * 100;
        setGrowthPercentageCustomer(growth);
      } else {
        setGrowthPercentageCustomer(null);
      }
    };
    calculateGrowthPercentageCustomer();
  }, [customerMounth, totalPriceLastMonth]);

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

  useEffect(() => {
    if (searchOption === 'month') {
      const currentDate = new Date();
      setMonth(currentDate.getMonth() + 1);
      setYear(currentDate.getFullYear());
    }
  }, [searchOption]);

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
      if (searchOption === 'day' && startDate && endDate) {
        const result = await infoBillByDate(
          format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss')
        );
        const formattedData = result.data && result.data.length > 0
          ? result.data.map((item) => ({
            date: format(new Date(item.ngayThanhToan), 'dd/MM/yyyy'),
            quantity: item.tongHoaDon,
            soldQuantity: item.tongSanPham,
          }))
          : [];

        setChartData(formattedData);
      } else if (searchOption === 'month' && month && year) {
        const formattedMonth = String(month).padStart(2, '0');
        const lastDay = new Date(year, month, 0).getDate();

        const result = await infoBillByDate(
          `${year}-${formattedMonth}-01 00:00:00`,
          `${year}-${formattedMonth}-${lastDay} 23:59:59`
        );
        const formattedData = result.data && result.data.length > 0
          ? result.data.map((item) => ({
            date: format(new Date(item.ngayThanhToan), 'dd/MM/yyyy'),
            quantity: item.tongHoaDon,
            soldQuantity: item.tongSanPham,
          }))
          : [];

        setChartData(formattedData);
      } else if (searchOption === 'year' && year) {
        const result = await infoBillByDate(
          `${year}-01-01 00:00:00`,
          `${year}-12-31 23:59:59`
        );
        const formattedData = result.data && result.data.length > 0
          ? result.data.map((item) => ({
            date: format(new Date(item.ngayThanhToan), 'dd/MM/yyyy'),
            quantity: item.tongHoaDon,
            soldQuantity: item.tongSanPham,
          }))
          : [];
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
    }
  }

  const handleFetchTotalPrice = async () => {
    try {
      if (searchOption === 'day' && startDate && endDate) {
        const result = await totalpriceByDate(
          format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss')
        );
        setTotalPrice(result.data);
      } else if (searchOption === 'month' && month && year) {
        const formattedMonth = String(month).padStart(2, '0');
        const lastDay = new Date(year, month, 0).getDate();

        const result = await totalpriceByDate(
          `${year}-${formattedMonth}-01 00:00:00`,
          `${year}-${formattedMonth}-${lastDay} 23:59:59`
        );
        setTotalPrice(result.data);
      } else if (searchOption === 'year' && year) {
        const result = await totalpriceByDate(
          `${year}-01-01 00:00:00`,
          `${year}-12-31 23:59:59`
        );
        setTotalPrice(result.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy tổng doanh thu:', error);
      setTotalPrice(0);
    }
  };

  const handleCountBillByDate = async () => {
    try {
      if (searchOption === 'day' && startDate && endDate) {
        const result = await countBill(
          format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss')
        );
        setTotalBill(result.data || 0);
      } else if (searchOption === 'month' && month && year) {
        const formattedMonth = String(month).padStart(2, '0');
        const lastDay = new Date(year, month, 0).getDate();

        const result = await countBill(
          `${year}-${formattedMonth}-01 00:00:00`,
          `${year}-${formattedMonth}-${lastDay} 23:59:59`
        );
        setTotalBill(result.data || 0);
      } else if (searchOption === 'year' && year) {
        const result = await countBill(
          `${year}-01-01 00:00:00`,
          `${year}-12-31 23:59:59`
        );
        setTotalBill(result.data || 0);
      }
    } catch (error) {
      console.error('Lỗi khi lấy tổng hóa đơn:', error);
    }
  };



  const handleBillByToDay = async () => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    try {
      const result = await countBill(
        format(startDate, 'yyyy-MM-dd HH:mm:ss'),
        format(endDate, 'yyyy-MM-dd HH:mm:ss')
      );
      settotalBillToday(result.data);
    } catch (error) {
      console.error('Lỗi khi lấy tổng hóa đơn:', error);
      settotalBillToday(0);
    }
  };

  const handleCountProductSoldOutByDate = async () => {
    try {
      if (searchOption === 'day' && startDate && endDate) {
        const result = await countProduct(
          format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          format(endDate, 'yyyy-MM-dd HH:mm:ss')
        );
        setTotalProduct(result.data || 0);
      } else if (searchOption === 'month' && month && year) {
        const formattedMonth = String(month).padStart(2, '0');
        const lastDay = new Date(year, month, 0).getDate();

        const result = await countProduct(
          `${year}-${formattedMonth}-01 00:00:00`,
          `${year}-${formattedMonth}-${lastDay} 23:59:59`
        );
        setTotalProduct(result.data || 0);
      } else if (searchOption === 'year' && year) {
        const result = await countProduct(
          `${year}-01-01 00:00:00`,
          `${year}-12-31 23:59:59`
        );
        setTotalProduct(result.data || 0);
      }
    } catch (error) {
      console.error('Lỗi khi lấy tổng sản phẩm đã bán:', error);
      setTotalProduct(0);
    }
  };


  const handleCalculateBillPercentage = async () => {
    let startFormattedDate, endFormattedDate;

    try {
      if (searchOption === 'day' && startDate && endDate) {
        startFormattedDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
        endFormattedDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');
      } else if (searchOption === 'month') {
        const currentDate = new Date();
        const selectedMonth = month || (currentDate.getMonth() + 1);
        const selectedYear = year || currentDate.getFullYear();
        startFormattedDate = format(new Date(selectedYear, selectedMonth - 1, 1), 'yyyy-MM-dd HH:mm:ss');
        endFormattedDate = format(new Date(selectedYear, selectedMonth, 0), 'yyyy-MM-dd HH:mm:ss');
      } else if (searchOption === 'year') {
        const selectedYear = year || new Date().getFullYear();
        startFormattedDate = format(new Date(selectedYear, 0, 1), 'yyyy-MM-dd HH:mm:ss');
        endFormattedDate = format(new Date(selectedYear, 11, 31), 'yyyy-MM-dd HH:mm:ss');
      } else {
        console.log("Vui lòng chọn khoảng thời gian hợp lệ.");
        return;
      }
      const result = await trangThaiHoaDonCalulate(startFormattedDate, endFormattedDate);
      settotalPrecentBill(result.data);
    } catch (error) {
      console.error('Lỗi khi lấy % trạng thái đơn hàng:', error);
      settotalPrecentBill(0);
    }
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = products.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleTotalPriceByMonth = async () => {
    try {
      const currentDate = new Date();
      const selectedMonth = month || (currentDate.getMonth() + 1);
      const selectedYear = year || currentDate.getFullYear();
      const startFormattedDate = format(new Date(selectedYear, selectedMonth - 1, 1), 'yyyy-MM-dd HH:mm:ss');
      const endFormattedDate = format(new Date(selectedYear, selectedMonth, 0), 'yyyy-MM-dd HH:mm:ss');
      const result = await totalpriceByDate(startFormattedDate, endFormattedDate);
      if (result && result.data) {
        setTotalPriceMounthNow(result.data || 0);
        console.log(result.data.totalPrice);

      } else {
        setTotalPriceMounthNow(0);
      }
    } catch (error) {
      console.error('Lỗi khi tính doanh thu tháng:', error);
      setTotalPriceMounthNow(0);
    }
  };

  const handleTotalPriceLastMonth = async () => {
    try {
      const currentDate = new Date();
      const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const previousYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();

      const startFormattedDate = format(new Date(previousYear, previousMonth, 1), 'yyyy-MM-dd HH:mm:ss');
      const endFormattedDate = format(new Date(previousYear, previousMonth + 1, 0), 'yyyy-MM-dd HH:mm:ss');

      const result = await totalpriceByDate(startFormattedDate, endFormattedDate);

      if (result && result.data) {
        setTotalPriceLastMonth(result.data || 0);
      } else {
        setTotalPriceLastMonth(0);
      }
    } catch (error) {
      console.error('Lỗi khi tính doanh thu tháng trước:', error);
      setTotalPriceLastMonth(0);
    }
  };

  const handleTotalBillByMonth = async () => {
    try {
      const currentDate = new Date();
      const selectedMonth = month || (currentDate.getMonth() + 1);
      const selectedYear = year || currentDate.getFullYear();
      const startFormattedDate = format(new Date(selectedYear, selectedMonth - 1, 1), 'yyyy-MM-dd HH:mm:ss');
      const endFormattedDate = format(new Date(selectedYear, selectedMonth, 0), 'yyyy-MM-dd HH:mm:ss');
      const result = await countBill(startFormattedDate, endFormattedDate);
      if (result && result.data) {
        setTotalBillMounthNow(result.data || 0);
      } else {
        setTotalBillMounthNow(0);
      }
    } catch (error) {
      console.error('Lỗi khi tính doanh thu tháng:', error);
      setTotalPriceMounthNow(0);
    }
  };

  const handleTotalBillLastMonth = async () => {
    try {
      const currentDate = new Date();
      const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const previousYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();

      const startFormattedDate = format(new Date(previousYear, previousMonth, 1), 'yyyy-MM-dd HH:mm:ss');
      const endFormattedDate = format(new Date(previousYear, previousMonth + 1, 0), 'yyyy-MM-dd HH:mm:ss');

      const result = await countBill(startFormattedDate, endFormattedDate);

      if (result && result.data) {
        setTotalBillLastMonth(result.data || 0);
      } else {
        setTotalBillLastMonth(0);
      }
    } catch (error) {
      console.error('Lỗi khi tính doanh thu tháng trước:', error);
      setTotalPriceLastMonth(0);
    }
  };

  const handleCountCustomerByMounthNow = async () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startDateInMilliseconds = startDate.getTime();
    const endDateInMilliseconds = endDate.getTime();

    try {
      const result = await countCustomerByDate(startDateInMilliseconds, endDateInMilliseconds);
      setCustomerMounth(result || 0);
      debugger;
    } catch (error) {
      console.error("Error counting customers by month:", error);
      setCustomerMounth(0);
    }
  };

  const handleCountCustomerByPreviousMonth = async () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
    const startDateInMilliseconds = startDate.getTime();
    const endDateInMilliseconds = endDate.getTime();

    try {
      const result = await countCustomerByDate(startDateInMilliseconds, endDateInMilliseconds);
      setCustomerPreviousMonth(result || 0);
      debugger;
    } catch (error) {
      console.error("Error counting customers for previous month:", error);
      setCustomerPreviousMonth(0);
    }
  };


  return (
    <Box sx={{ padding: 2 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4, // Khoảng cách giữa các Card
            }}
          >
            <Card
              sx={{
                padding: 3,
                background: 'linear-gradient(135deg, #42a5f5, #7986cb)',
                color: '#fff',
                borderRadius: '12px',
                width: '30%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Box textAlign="center">
                <AttachMoneyIcon sx={{ fontSize: 40, mb: 1, color: '#fff' }} />
                <Typography variant="h6" gutterBottom color="white">
                  Doanh Thu Hôm Nay
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="white">
                  {revenue != null ? revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND'}
                </Typography>
              </Box>
            </Card>

            <Card
              sx={{
                padding: 3,
                background: 'linear-gradient(135deg, #42a5f5, #7986cb)', // Màu gradient xanh dịu mắt
                color: '#fff',
                borderRadius: '12px',
                width: '30%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Box textAlign="center">
                <ReceiptIcon sx={{ fontSize: 40, mb: 1, color: '#fff' }} />
                <Typography variant="h6" gutterBottom color="white">
                  Tổng Hóa Đơn Ngày Hôm Nay
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="white">
                  {totalBillToday !== null ? totalBillToday : '0'}
                </Typography>
              </Box>
            </Card>
          </Box>


          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, mt: 5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
                background: '#f7f7f7',
                borderRadius: '8px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                minWidth: '800px',
              }}
            >
              <Typography sx={{ marginRight: 3, fontWeight: '600', color: '#333' }}>
                Tìm kiếm theo
              </Typography>

              <Select
                value={searchOption}
                onChange={(e) => {
                  setSearchOption(e.target.value);
                  setStartDate(null);
                  setEndDate(null);
                  setMonth('');
                  setYear('');
                }}
                sx={{
                  padding: '8px',
                  borderRadius: '4px',
                  background: '#fff',
                  color: '#333',
                  fontWeight: '600',
                  width: '150px',
                  minWidth: '150px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ccc' },
                  },
                }}
              >
                <MenuItem value="day">Ngày</MenuItem>
                <MenuItem value="month">Tháng</MenuItem>
                <MenuItem value="year">Năm</MenuItem>
              </Select>
              {searchOption === 'day' && (
                <>
                  <Typography sx={{ marginRight: 2, fontWeight: '600', color: '#333' }}>
                    Từ ngày
                  </Typography>
                  <TextField
                    type="date"
                    value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    sx={{
                      marginRight: 3,
                      padding: '8px',
                      borderRadius: '4px',
                      background: '#fff',
                      color: '#333',
                      fontWeight: '600',
                      width: '150px',
                      minWidth: '150px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                      },
                    }}
                    placeholder="Chọn ngày"
                  />

                  <Typography sx={{ marginRight: 2, fontWeight: '600', color: '#333' }}>
                    Đến ngày
                  </Typography>
                  <TextField
                    type="date"
                    value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    sx={{
                      padding: '8px',
                      borderRadius: '4px',
                      background: '#fff',
                      color: '#333',
                      fontWeight: '600',
                      width: '150px',
                      minWidth: '150px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                      },
                    }}
                    placeholder="Chọn ngày"
                  />
                </>
              )}
              {searchOption === 'month' && (
                <>
                  <Typography sx={{ marginRight: 2, fontWeight: '600', color: '#333' }}>
                    Tháng
                  </Typography>
                  <Select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    sx={{
                      padding: '8px',
                      borderRadius: '4px',
                      background: '#fff',
                      color: '#333',
                      fontWeight: '600',
                      width: '100px',
                      minWidth: '130px',
                      marginRight: 3
                    }}
                  >
                    <MenuItem value="">Chọn tháng</MenuItem>
                    {Array.from({ length: 12 }, (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {`Tháng ${i + 1}`}
                      </MenuItem>
                    ))}
                  </Select>

                  <Typography sx={{ marginRight: 2, fontWeight: '600', color: '#333' }}>
                    Năm
                  </Typography>
                  <Select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    sx={{
                      padding: '8px',
                      borderRadius: '4px',
                      background: '#fff',
                      color: '#333',
                      fontWeight: '600',
                      width: '100px',
                      minWidth: '100px',
                    }}
                  >
                    <MenuItem value="">Chọn năm</MenuItem>
                    {Array.from({ length: 10 }, (_, i) => {
                      const currentYear = new Date().getFullYear();
                      return (
                        <MenuItem key={i} value={currentYear - i}>
                          {currentYear - i}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </>
              )}

              {searchOption === 'year' && (
                <>
                  <Typography sx={{ marginRight: 2, fontWeight: '600', color: '#333' }}>
                    Năm
                  </Typography>
                  <Select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    sx={{
                      padding: '8px',
                      borderRadius: '4px',
                      background: '#fff',
                      color: '#333',
                      fontWeight: '600',
                      width: '100px',
                      minWidth: '100px',
                    }}
                  >
                    <MenuItem value="">Chọn năm</MenuItem>
                    {Array.from({ length: 10 }, (_, i) => {
                      const currentYear = new Date().getFullYear();
                      return (
                        <MenuItem key={i} value={currentYear - i}>
                          {currentYear - i}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </>
              )}
            </Box>
          </Box>


          <Box sx={{ border: '1px solid #f0f0f0', borderRadius: '8px', padding: 2, backgroundColor: '#f5f1ef' }}>
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
                  backgroundColor: '#1E88E5',
                  color: '#fff',
                  borderRadius: '8px',
                  width: '48%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                }}
              >
                <Box textAlign="center">
                  <AttachMoneyIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom color="white">
                    Tổng doanh thu
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="white">
                    {totalPrice
                      ? totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                      : '0'}
                  </Typography>
                </Box>
              </Card>
              <Card
                sx={{
                  padding: 3,
                  backgroundColor: '#FF7043', // Màu cam nhạt
                  color: '#fff',
                  borderRadius: '8px',
                  width: '48%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
                  backgroundColor: '#66BB6A', // Màu xanh lá cây nhạt
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

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5, mt: 5 }}>
              <Card sx={{ padding: 3, maxWidth: '90%', width: '100%', backgroundColor: '#f5f1ef' }}>
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
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, mt: 5, gap: 10 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h4" gutterBottom align="center">
                Mức độ tăng trưởng của cửa hàng
              </Typography>
              <Card
                sx={{
                  padding: 3,
                  backgroundColor: growthPercentage > 0 ? '#e0f7fa' : '#ffebee',
                  color: growthPercentage > 0 ? '#00796b' : '#c62828',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #ddd'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                  {growthPercentage > 0 ? (
                    <TrendingUpIcon fontSize="large" />
                  ) : (
                    <TrendingDownIcon fontSize="large" />
                  )}
                  <Typography variant="h6" fontWeight="bold">
                    Tăng trưởng doanh thu
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {growthPercentage !== null
                    ? `${growthPercentage.toFixed(2)}%`
                    : 'Không có dữ liệu'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  So với tháng trước
                </Typography>
              </Card>

              <Card
                sx={{
                  padding: 3,
                  backgroundColor: growthPercentage > 0 ? '#e0f7fa' : '#ffebee',
                  color: growthPercentage > 0 ? '#00796b' : '#c62828',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #ddd'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                  {growthPercentage > 0 ? (
                    <TrendingUpIcon fontSize="large" />
                  ) : (
                    <TrendingDownIcon fontSize="large" />
                  )}
                  <Typography variant="h6" fontWeight="bold">
                    Tăng trưởng hóa đơn
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {growthPercentageBill !== null
                    ? `${growthPercentageBill.toFixed(2)}%`
                    : 'Không có dữ liệu'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  So với tháng trước
                </Typography>
              </Card>

              <Card
                sx={{
                  padding: 3,
                  backgroundColor: growthPercentage > 0 ? '#e0f7fa' : '#ffebee',
                  color: growthPercentage > 0 ? '#00796b' : '#c62828',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #ddd'
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                  {growthPercentage > 0 ? (
                    <TrendingUpIcon fontSize="large" />
                  ) : (
                    <TrendingDownIcon fontSize="large" />
                  )}
                  <Typography variant="h6" fontWeight="bold">
                    Lượng khách hàng mới
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {growthPercentageCustomer !== null
                    ? `${growthPercentageCustomer.toFixed(2)}%`
                    : 'Không có dữ liệu'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  So với tháng trước
                </Typography>
              </Card>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', p: 3 }}>
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
                  Top 5 Sản Phẩm Bán Tốt Nhất
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
