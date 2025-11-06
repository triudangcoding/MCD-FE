import type { RouteObject } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Example from '@/pages/Example';
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
    
    ]
  }
];

export default routes; 