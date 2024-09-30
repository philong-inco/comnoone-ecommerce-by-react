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
                    title: 'Thống Kê Chi Tiết',
                    type: 'item',
                    url: '/thongke/doanhthu'
                  }       
                ]
        }
    ]
}

export default thongKe;