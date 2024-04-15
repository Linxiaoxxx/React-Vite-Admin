import { Navigate, useRoutes } from 'react-router-dom'
import type { ReactNode } from 'react'
import React from 'react'
import lazyLoad from './components/LazyLoad'
import { RouterSort } from './uitls'
import routerConfig from './config'
import generateRouterByMeta2 from './generateByConfig'
import generateRouterByConfigNew from './generateByConfigNew'
import Login from '@/views/login'
import NotFound from '@/views/exception/404'
import NotAuth from '@/views/exception/403'
import Test1 from '@/views/test/test1'
import Test2 from '@/views/test/test2'

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

export const routerArrayOld: Router.RouteObject[] = generateRouterByModules()
// console.log('routerArrayOld', routerArrayOld)
export const routerArray: Router.RouteObject[] = generateRouterByMeta2()
console.log('routerArray', routerArray)
export const routerArray2: Router.RouteObject[] = generateRouterByConfigNew()
console.log('routerArray2', routerArray2)

export const routersTree = []
export const rootRouter: Router.RouteObject[] = [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/layout/index'))),
    children: routerArray
    // children: RouterSort(routerArray)
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
