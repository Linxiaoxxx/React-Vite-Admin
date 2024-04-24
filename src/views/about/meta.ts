export default defineRouterMeta({
  title: 'About',
  isLayout: true,
  order: 5,
  children: {
    ':name': {
      title: 'About :name'

    }
  }

})
