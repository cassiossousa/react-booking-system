import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { BookingsPage } from '../pages/BookingsPage/BookingsPage';
import { PropertiesPage } from '../pages/PropertiesPage/PropertiesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <BookingsPage />,
      },
      {
        path: 'properties',
        element: <PropertiesPage />,
      },
    ],
  },
]);
