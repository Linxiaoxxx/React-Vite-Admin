import React, { createRef } from 'react'
import lazyLoad from '../components/LazyLoad'

const homeRoute: Router.RouteObject = {
  element: lazyLoad(React.lazy(() => import('@/views/index'))),
  path: '/home',
  nodeRef: createRef(),
  meta: {
    order: 1,
    title: '首页',
    permission: ''
  }
}

export default homeRoute
