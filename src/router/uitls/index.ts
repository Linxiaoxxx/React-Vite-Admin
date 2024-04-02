export function checkRoutePermission(route: Router.RouteObject, auth: string[] = []) {
  if (!route.meta?.permission || !route.meta.permission.length || auth.includes('*')) {
    return true
  }
  const RPermissions = Array.isArray(route.meta.permission) ? route.meta.permission : [route.meta.permission]
  return auth.some(permission => RPermissions.includes(permission))
}

// * 查找第一个有权限的路由
export function findFirstAuthRoute(routes: Router.RouteObject[], auth: string[] = []): Router.RouteObject | null {
  for (const route of routes) {
    // 检查当前路由的权限
    if (checkRoutePermission(route, auth) && !route.children) {
      return route
    }
    // 递归检查子路由
    if (route.children) {
      const authorizedChildRoute = findFirstAuthRoute(route.children, auth)
      if (authorizedChildRoute) {
        return authorizedChildRoute
      }
    }
  }

  return null
}

// * 排序
export function RouterSort(routers: Router.RouteObject[]) {
  routers.sort((a, b) => {
    if (a.meta && b.meta) {
      return (a.meta.order ?? 0) - (b.meta.order ?? 0)
    }
    return 0
  })
  routers.forEach((route) => {
    if (route.children) {
      RouterSort(route.children)
    }
  })
  return routers
}
