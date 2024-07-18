import { IconCoin } from '@tabler/icons-react';

const icons = { IconCoin };

const chinhSach = {
    id: 'rule',
    title: 'Chính sách',
    type: 'group',
    children: [
        {
            id: 'chinhsach',
            title: 'Chính sách bán hàng',
            type: 'item',
            url: '/chinhsach',
            icon: icons.IconCoin,
            target: true
        }
    ]
}

export default chinhSach;