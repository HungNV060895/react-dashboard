import { RouteObject } from 'react-router-dom'
import App from '@/App'
import Dashboard from '@/pages/Dashboard'
import Orders from '@/pages/Orders'
import Products from '@/pages/Products'
import Users from '@/pages/Users'
import Settings from '@/pages/Settings'

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
        element: <Users />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]
