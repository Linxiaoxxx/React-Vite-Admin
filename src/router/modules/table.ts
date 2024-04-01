import React, { createRef } from 'react'
import lazyLoad from '../components/LazyLoad'

const demoRoute: Router.RouteObject = {
  path: '/table',
  meta: {
    order: 3,
    permission: '',
    title: '数据展示'
  },
  nodeRef: createRef(),
  children: [
    {
      element: lazyLoad(React.lazy(() => import('@/views/table/scrollTable'))),
      path: '/table/scroll',
      meta: { title: '加载更多', permission: '' }
    },
    {
      element: lazyLoad(React.lazy(() => import('@/views/table/paginationTable'))),
      path: '/table/pagination',
      meta: { title: '分页', permission: '' }
    }
  ]
}

export default demoRoute
