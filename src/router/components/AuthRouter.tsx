import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import Router, { HOME_URL, rootRouter, routerArray } from '@/router'
import { store } from '@/redux'
import { setFirstAuthRouter } from '@/redux/modules/user/action'

// import { AxiosCanceler } from '@/request/axiosCancel'

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

// const axiosCanceler = new AxiosCanceler()

/**
 * 路由守卫组件
 * @param props
 */
function AuthRouter(props: { children: JSX.Element }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const route = searchRoute(pathname.replace(/^\//, ''), rootRouter)
  // const dispatch = useDispatch()

  // 判断是否登录
  const loginStatus = useSelector((state: any) => state.user.loginStatus)
  // if (!loginStatus && pathname !== "/login") {
  //   console.log("2222", 2222);
  //   return <Navigate to="/login" replace />;
  // }

  // 获取用户的权限列表
  // const userPermission = useSelector(
  //   (state: any) => state.user.userInfo?.permissionList ?? []
  // );

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

  useEffect(() => {
    console.log('loginStatus---------', loginStatus)
    if (!loginStatus && pathname !== '/login') {
      navigate('/login', { replace: true })
    }
  }, [loginStatus])

  // * 路由重定向
  if (pathname === '/') {
    return <Navigate to={HOME_URL} />
  }

  // 判断是否需要路由拦截
  if (!route.meta?.requiresAuth) {
    return props.children
  }

  return props.children
}

export default AuthRouter
