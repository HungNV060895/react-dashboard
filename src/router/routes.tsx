import { RouteObject } from 'react-router-dom'
import App from '@/App'
import Dashboard from '@/pages/Dashboard'
import Orders from '@/pages/Orders'
import Products from '@/pages/Products'
import Settings from '@/pages/Settings'
import UserPage from '@/pages/Users'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/users',
        element: <UserPage />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/tanstack-user',
        element: <UserPage />,
      },
    ],
  },
]
