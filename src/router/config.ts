const routerConfig: Record<string, Router.MetaProps> = {
  '/': {
    title: 'home',
    permission: ''
  },
  '/about': {
    title: 'About'
  },
  '/about/:name': {
    title: 'About Name'
  },
  '/about/:id/user': {
    title: 'About id user'
  },
  '/demo': {
    title: 'demo'
  },
  '/demo/icon': {
    title: 'demo icon'
  }

}

export default routerConfig
