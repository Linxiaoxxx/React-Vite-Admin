const routerConfig: Record<string, Router.MetaProps> = {
  '/': {
    title: 'home',
    permission: ''
  },
  '/about': {
    title: 'About'
  },
  '/about/:name': {
    title: 'About Name',
    hideInMenu: true
  },
  '/about/:id/user': {
    title: 'About id user',
    hideInMenu: true
  },
  '/about/:id': {
    title: 'About id',
    hideInMenu: true
  },
  '/demo': {
    title: 'demo',
    isLayout: true
  },
  '/demo/icon': {
    title: 'demo icon'
  }

}

export default routerConfig
