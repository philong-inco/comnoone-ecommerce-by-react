import React from 'react';
import { Container, Typography, Box, Divider, Grid } from '@mui/material';

function ChinhSach() {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6}>

        <Typography variant="h3" gutterBottom align="center">
          Chính Sách & Nội Quy Cửa Hàng Laptop COMNOONE
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Chúng tôi cam kết cung cấp những sản phẩm và dịch vụ tốt nhất cho khách hàng. Dưới đây là những quy định mà COMNOONE tuân thủ nhằm đảm bảo lợi ích cho khách hàng và nhân viên.
        </Typography>
        
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" gutterBottom>
          Nội Quy Cửa Hàng
        </Typography>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            1. Thời gian mở cửa
          </Typography>
          <Typography paragraph>
            - Cửa hàng mở cửa từ <b>8:00 sáng đến 9:00 tối</b> mỗi ngày, bao gồm các ngày cuối tuần (trừ các ngày lễ lớn).
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Bảo hành và đổi trả sản phẩm
          </Typography>
          <Typography paragraph>
            - Sản phẩm được bảo hành trong vòng <b>12 tháng</b> kể từ ngày mua. Khách hàng có thể đổi trả sản phẩm trong vòng <b>30 ngày</b> nếu có lỗi do nhà sản xuất.
          </Typography>
          <Typography paragraph>
            - Các sản phẩm đổi trả phải đảm bảo còn nguyên tem, phiếu bảo hành và hóa đơn mua hàng. Nếu có bất kỳ dấu hiệu bị thay đổi, cửa hàng sẽ không chấp nhận đổi trả.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Chính sách thanh toán
          </Typography>
          <Typography paragraph>
            - Cửa hàng chấp nhận nhiều hình thức thanh toán như <b>tiền mặt, thẻ tín dụng, chuyển khoản ngân hàng</b>, và các phương thức ví điện tử phổ biến.
          </Typography>
          <Typography paragraph>
            - Thanh toán phải được thực hiện đầy đủ và rõ ràng trước khi sản phẩm được bàn giao.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Chính sách khách hàng thân thiết
          </Typography>
          <Typography paragraph>
            - Khách hàng thân thiết tại COMNOONE sẽ nhận được các ưu đãi đặc biệt như: <b>giảm giá, quà tặng sinh nhật, ưu đãi khuyến mãi riêng biệt</b>.
          </Typography>
          <Typography paragraph>
            - Để trở thành khách hàng thân thiết, bạn cần đăng ký tài khoản với COMNOONE và tích lũy điểm sau mỗi lần mua hàng.
          </Typography>
          <Typography paragraph>
            - Phiếu giảm giá áp dụng cho khách hàng sẽ không quá 2 triệu đồng, phiếu giảm giá nếu là khách hàng cá nhân sẽ được gửi qua email cá nhân của khách hàng.
          </Typography>
        </Box>

        {/* Nội quy nhân viên */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" gutterBottom>
          Nội Quy Nhân Viên
        </Typography>

        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            1. Thời gian làm việc
          </Typography>
          <Typography paragraph>
            - Nhân viên làm việc từ <b>8:00 sáng đến 5:00 chiều</b>, từ <b>thứ Hai đến thứ Bảy</b>. Nghỉ trưa từ <b>12:00 đến 1:00 chiều</b>.
          </Typography>
          <Typography paragraph>
            - Nhân viên cần phải đến đúng giờ, chấm công đúng quy định. Trường hợp đến muộn phải thông báo trước cho quản lý và có lý do chính đáng.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Quy tắc trang phục
          </Typography>
          <Typography paragraph>
            - Nhân viên cần mặc <b>đồng phục cửa hàng</b> trong suốt quá trình làm việc và giữ gìn vệ sinh cá nhân, tạo ấn tượng chuyên nghiệp với khách hàng.
          </Typography>
          <Typography paragraph>
            - Đồng phục phải sạch sẽ, gọn gàng và được trang bị đầy đủ phụ kiện theo yêu cầu của cửa hàng.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Thái độ làm việc và phục vụ khách hàng
          </Typography>
          <Typography paragraph>
            - Nhân viên cần giữ thái độ <b>lịch sự, niềm nở và chuyên nghiệp</b> với khách hàng. Mọi yêu cầu và thắc mắc của khách hàng cần được giải quyết nhanh chóng và chính xác.
          </Typography>
          <Typography paragraph>
            - Luôn tuân thủ các quy tắc trong công việc và tránh gây mâu thuẫn với đồng nghiệp hoặc khách hàng.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Nghỉ phép và nghỉ lễ
          </Typography>
          <Typography paragraph>
            - Nhân viên có quyền nghỉ phép theo <b>quy định của luật lao động</b>. Để nghỉ phép, nhân viên phải thông báo trước ít nhất <b>3 ngày</b> cho quản lý và được sự chấp thuận.
          </Typography>
          <Typography paragraph>
            - Các ngày nghỉ lễ sẽ được thông báo trước. Nhân viên cần theo dõi lịch để đảm bảo tuân thủ quy định làm việc trong những ngày đặc biệt.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Chính sách khen thưởng và kỷ luật
          </Typography>
          <Typography paragraph>
            - Nhân viên xuất sắc sẽ được <b>khen thưởng</b> hàng tháng với các phần thưởng có giá trị và cơ hội thăng tiến.
          </Typography>
          <Typography paragraph>
            - Nhân viên vi phạm nội quy sẽ bị <b>xử lý kỷ luật</b> tùy theo mức độ vi phạm. Các hình thức xử lý bao gồm cảnh cáo, hạ bậc lương, hoặc nghiêm trọng hơn là <b>chấm dứt hợp đồng</b>.
          </Typography>
        </Box>

      </Box>
    </Container>
  );
}

export default ChinhSach;
