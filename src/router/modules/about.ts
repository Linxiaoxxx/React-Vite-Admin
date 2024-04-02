import React, { createRef } from 'react'
import lazyLoad from '../components/LazyLoad'

const aboutRoute: Router.RouteObject = {
  element: lazyLoad(React.lazy(() => import('@/views/about/index'))),
  nodeRef: createRef(),
  path: '/about',
  meta: {
    order: 2,
    title: '关于我们',
    permission: 'about'
  }
}

export default aboutRoute
