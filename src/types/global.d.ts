export interface TableData {
  [x: string]: any
}

declare global {
  declare namespace Router {
    type RouteType = 'route' | 'link' | 'iframe'
    interface LinkProps {
      href: string
      target: '_blank' | 'viewFrame'
    }
    type LinkType = string | LinkProps

    interface MetaProps {
      title: string
      icon?: string | React.ReactNode
      order?: number
      permission?: string | string[]
      hideInMenu?: boolean
      routeType?: RouteType // 路由类型
      link?: LinkType // 当路由类型为 link | iframe 时需要填写此信息
      isLayout?: boolean // 是否是布局路由
      children?: Record<string, MetaProps>
    }
    interface RouteObject<T = any> {
      children?: RouteObject[]
      element?: React.ReactNode
      path: string
      name?: string
      meta?: MetaProps
      // isLink?: string
      nodeRef?: RefObject<T>
    }
  }

  const defineRouterMeta: (meta: Router.MetaProps) => Router.MetaProps

}
