import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'
import { checkRoutePermission } from '../uitls'
import { HOME_URL, rootRouter } from '@/router'

/**
 * @description 递归查询对应的路由
 * @param {string} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export function searchRoute(path: string, routes: any[] = []): any {
  let result: any = {}
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * 路由守卫组件
 */
function AuthRouter(props: { children: JSX.Element }) {
  const { pathname } = useLocation()

  const route = searchRoute(pathname, rootRouter)

  const loginStatus = useSelector((state: ReduxType) => state.user.loginStatus)
  const userInfo = useSelector((state: ReduxType) => state.user.userInfo)

  // 判断权限
  if (loginStatus && !checkRoutePermission(route, userInfo?.permission ?? [])) {
    return <Navigate to="/403" replace />
  }
  if (!loginStatus && pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  // 找到第一个有权限的路由，且作为首页
  // const firstRoute = useSelector((state: any) => state.user.firstAuthRoute);

  // useEffect(() => {
  //   // 找到第一个有权限的路由，且作为首页
  //   const newFirstRoute = findFirstAuthRoute(routerArray, userPermission);
  //   dispatch(
  //     setFirstAuthRouter(
  //       newFirstRoute
  //         ? { path: newFirstRoute?.path, meta: newFirstRoute.meta }
  //         : null
  //     )
  //   );
  // }, [userPermission]);

  // useEffect(() => {
  //   // 判断是否登录
  //   if (!loginStatus && pathname !== '/login') {
  //     navigate('/login', { replace: true })
  //   }
  // }, [loginStatus])

  // * 路由重定向
  if (pathname === '/' && HOME_URL !== '/') {
    return <Navigate to={HOME_URL} />
  }

  return props.children
}

export default AuthRouter
