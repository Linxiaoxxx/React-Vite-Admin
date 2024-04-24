import { RouterSort } from './uitls'

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

export default generateRouterByModules
