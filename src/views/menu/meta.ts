export default defineRouterMeta({
  title: 'menu',
  order: 4,
  children: {
    submenu2: {
      title: 'submenu2',
      children: {
        submenu3: {
          title: 'submenu3'
        }
      }
    }
  }
})
