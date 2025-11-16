import {
    LayoutDashboard,
    User,
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', category: 'main', path: '/' },
    { icon: User, label: 'Users', category: 'management', path: '/dashboard/users' },
];

export default menuItems;