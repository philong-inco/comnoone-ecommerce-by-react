import { IconCoin } from '@tabler/icons-react';

const icons = { IconCoin };

const banHang = {
  id: 'ban-hang',
  title: 'Bán hàng',
  type: 'group',
  children: [
    {
      id: 'ban-hang-tai-quay',
      title: 'Bán hàng tại quầy',
      type: 'item',
      url: '/ban-hang/',
      icon: icons.IconCoin,
      breadcrumbs: false
    }
  ]
};

export default banHang;
