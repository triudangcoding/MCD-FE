import {
    LayoutDashboard,
    User,
    Group,
    Settings,
    Key,
    AlertTriangle,
    Building,
    ListOrdered,
    Brush,
    Contact,
    Sparkles,
    Ticket,
    Calendar,
    Calculator
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', category: 'main', path: '/' },
    { icon: ListOrdered, label: 'Order', category: 'main', path: '/orders' },
    { icon: User, label: 'Users', category: 'management', path: '/dashboard/users' },
    { icon: Group, label: 'Customer', category: 'management', path: '/customer' },
    { icon: Building, label: 'Branch', category: 'management', path: '/branch' },
    { icon: Sparkles, label: 'Service', category: 'management', path: '/service' },
    { icon: Brush, label: 'Department', category: 'management', path: '/department' },
    { icon: Ticket, label: 'Voucher', category: 'management', path: '/voucher' },
    { icon: Calendar, label: 'Schedule', category: 'management', path: '/schedule' },
];

export default menuItems;