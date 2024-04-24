export default defineRouterMeta({
  title: 'About',
  order: 5,
  children: {
    ':name': {
      title: 'About :name',
      hideInMenu: true

    }
  }

})
