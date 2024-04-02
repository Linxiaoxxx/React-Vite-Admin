import { Navigate, useRoutes } from 'react-router-dom'
import React from 'react'
import lazyLoad from './components/LazyLoad'
import { RouterSort } from './uitls'
import Login from '@/views/login'
import NotFound from '@/views/exception/404'
import NotAuth from '@/views/exception/403'

/**
 * 通过路由模块配置文件生成路由
 * @returns 路由数组
 */
function generateRouterByModules() {
  // * 导入所有router模块
  const metaRouters: Record<string, Router.RouteObject> = import.meta.glob(
    './modules/*.(ts|tsx)',
    {
      eager: true,
      import: 'default'
    }
  )
  // 排序、整理路由
  return RouterSort(Object.values(metaRouters)).flatMap((route) => {
    // 判断添加重定向路由，且重定向的路由顺序很重要，必须先写重定向的路由才有效
    if (!route.element && route.children) {
      return [{ path: route.path, element: <Navigate to={route.children?.[0].path ?? ''} /> }, route]
    }
    return route
  })
}

/**
 * 通过模块配置文件生成路由
 */
// function generateRouterByMeta() {
//   return []
// }

export const routerArray: Router.RouteObject[] = generateRouterByModules()

export const rootRouter: Router.RouteObject[] = [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/layout/index'))),
    children: RouterSort(routerArray)
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

export const HOME_URL = '/home'

export default Router
