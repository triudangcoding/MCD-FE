import type { RouteObject } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
    ]
  }
];

export default routes; 