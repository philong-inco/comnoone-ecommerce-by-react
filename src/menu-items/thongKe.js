import { IconChartBar } from '@tabler/icons-react';

const icons = { IconChartBar};

const thongKe = {
    id: 'doluong',
    title: 'Đo lường',
    type: 'group',
    children: [
        {
            id: 'thongke',
            title: 'Thống kê',
            type: 'collapse',
            icon: icons.IconChartBar,
            children: [
                {
                    id: 'doanhthu',
                    title: 'Doanh thu',
                    type: 'item',
                    url: '/thongke/doanhthu'
                  },
                  {
                    id: 'sanpham',
                    title: 'Sản phẩm bán chạy',
                    type: 'item',
                    url: '/thongke/sanpham'
                  }
            ]
        }
    ]
}

export default thongKe;