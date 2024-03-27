export interface TableData {
  [x: string]: any
}

export interface TabsOptions {
  path: string
  title: string
  icon?: string
  isLink?: string
  close?: boolean
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
      keepAlive?: boolean
      requiresAuth?: boolean
      title: string
      icon?: string
      order?: number
      permission?: string
      svg?: string
      hideInMenu?: boolean
    }

    interface RouteObject<T = any> {
      children?: RouteObject[]
      element?: React.ReactNode
      path: string
      meta?: MetaProps
      isLink?: string
      nodeRef?: RefObject<T>
    }

    interface RouteMeta {
      title: string
      icon?: Raw<Component>
      order?: number
      isLayout?: boolean
      routeType?: RouteType // 路由类型
      link?: LinkType // 当路由类型为 link | iframe 时需要填写此信息
      permission?: string | string[] // 权限
      children?: RouteMeta[]
    }
  }
}
