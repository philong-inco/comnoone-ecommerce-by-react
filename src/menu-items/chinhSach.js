import { IconInfoSquare } from '@tabler/icons-react';

const icons = { IconInfoSquare };

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
            icon: icons.IconInfoSquare,
            target: true
        }
    ]
}

export default chinhSach;