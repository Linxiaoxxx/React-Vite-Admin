// * 查找第一个有权限的路由
export const findFirstAuthRoute = (
  routes: Router.RouteObject[],
  auth: string[] = []
): Router.RouteObject | null => {
  for (let route of routes) {
    const hasPremission =
      !route.meta?.permission || auth.includes(route.meta.permission);
    // 检查当前路由的权限
    if (hasPremission && !route.children) {
      return route;
    }
    // 递归检查子路由
    if (route.children) {
      const authorizedChildRoute = findFirstAuthRoute(route.children, auth);
      if (authorizedChildRoute) {
        return authorizedChildRoute;
      }
    }
  }

  return null;
};

// * 排序
export const RouterSort = (routers: Router.RouteObject[]) => {
  routers.sort((a, b) => {
    if (a.meta && b.meta) {
      return (a.meta.order ?? 0) - (b.meta.order ?? 0);
    }
    return 0;
  });
  routers.forEach((route) => {
    if (route.children) {
      RouterSort(route.children);
    }
  });
  return routers;
};
