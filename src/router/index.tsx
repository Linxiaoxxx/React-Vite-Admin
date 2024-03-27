import { Navigate, useRoutes } from 'react-router-dom'
import React from 'react'
import lazyLoad from './components/LazyLoad'
import { RouterSort } from './uitls'
import Login from '@/views/login'
import NotFound from '@/views/NotFound'

/**
 * 通过路由模块配置文件生成路由
 * @returns 路由数组
 */
function generateRouterByModules() {
  // * 导入所有router
  const metaRouters: Record<string, Router.RouteObject> = import.meta.glob(
    './modules/*.ts',
    {
      eager: true,
      import: 'default'
    }
  )

  // * 处理路由
  return Object.keys(metaRouters).map((item) => {
    return metaRouters[item]
  })
  // 添加一个重定向地址
  //   .map((ele: any) => {
  //   return {
  //     ...ele,
  //     element: !ele.element && ele.children ? <Navigate to="/demo/icon" /> : ele.element
  //   }
  // })
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
  }
]

function Router() {
  const routes = useRoutes(rootRouter)
  return routes
}

export const HOME_URL = '/home'

export default Router
