import type { RouteObject } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import DashboardLayout from '@/layouts/dashboard.layout';
import UsersManagementPage from '@/pages/users';
import LoginPage from '@/pages/auth/login.page';
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: 'users',
            element: <UsersManagementPage />,
          }
        ]
      }
    ]
  }
];

export default routes; 