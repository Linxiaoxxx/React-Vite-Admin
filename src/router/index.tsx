import { useRoutes } from 'react-router-dom'
import generateByMeta from './generateByMeta'
import generateRouterByModules from './generateByModules'
import Login from '@/views/login'
import NotFound from '@/views/exception/404'
import NotAuth from '@/views/exception/403'
import DefaultLayout from '@/layout/index'

// export const routerArray: Router.RouteObject[] = generateRouterByModules()
export const routerArray: Router.RouteObject[] = generateByMeta()
// console.log('routerArray', routerArray)

export const rootRouter: Router.RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: routerArray

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/403',
    element: <NotAuth />
  }
]

function Router() {
  const routes = useRoutes(rootRouter)
  return routes
}

export const HOME_URL = '/'

export default Router
