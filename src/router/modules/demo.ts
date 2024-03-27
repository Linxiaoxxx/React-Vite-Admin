import React, { createRef } from 'react'
import lazyLoad from '../components/LazyLoad'

const demoRoute: Router.RouteObject = {
  path: '/demo',
  meta: {
    order: 4,
    permission: '',
    title: 'demo'
  },
  nodeRef: createRef(),
  children: [

    {
      element: lazyLoad(React.lazy(() => import('@/views/demo/icon/index'))),
      path: '/demo/icon',
      meta: { title: 'ICON', permission: '' }
    }
  ]
}

export default demoRoute
