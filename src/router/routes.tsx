import type { RouteObject } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import DashboardLayout from '@/layouts/dashboard.layout';
import UsersManagementPage from '@/pages/UsersManagementPage.tsx';
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
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