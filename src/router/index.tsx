import { useRoutes } from 'react-router-dom'
import { routes } from './routes'

export const Router = () => {
  return useRoutes(routes)
}

export default Router
