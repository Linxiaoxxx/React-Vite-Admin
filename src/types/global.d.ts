export interface TableData {
  [x: string]: any
}

declare global {
  declare namespace Router {
    interface LinkProps {
      href: string
      target: '_blank' | 'viewFrame'
    }

    interface MetaProps {
      title: string
      icon?: string | React.ReactNode
      order?: number
      permission?: string | string[]
      hideInMenu?: boolean
      link?: LinkProps // 当路由类型为 link | iframe 时需要填写此信息
      isLayout?: boolean // 是否是布局路由
      children?: Record<string, MetaProps>
    }
    interface RouteObject<T = any> {
      children?: RouteObject[]
      element?: React.ReactNode
      path: string
      name?: string
      meta?: MetaProps
      nodeRef?: RefObject<T>
    }

    interface GenerateConfig {
      ignoreFiles?: string[] // 忽略的文件名
      // skipLoginCheck?: string[] // 跳过登录检测的路径
    }
    interface RouterConfig extends GenerateConfig {
      byModules?: boolean // 是否根据自定义模块划分路由
      modules?: string[] // 自定义模块
    }

  }

  const defineRouterMeta: (meta: Router.MetaProps) => Router.MetaProps

}
