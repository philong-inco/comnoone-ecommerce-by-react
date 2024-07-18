import { IconCoin } from '@tabler/icons-react';

const icons = { IconCoin };

const banHang = {
    id: 'banHang',
    title: 'Bán hàng',
    type: 'group',
    children: [
        {
            id: 'banhangtaiquay',
            title: 'Bán hàng tại quầy',
            type: 'item',
            url: '/hoadon/banhangtaiquay',
            icon: icons.IconCoin,
            breadcrumbs: false
        }
    ]
}

export default banHang;