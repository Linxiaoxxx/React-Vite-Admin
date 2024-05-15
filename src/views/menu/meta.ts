export default defineRouterMeta({
  title: '菜单演示',
  order: 4,
  icon: 'UnorderedListOutlined',
  children: {
    'submenu2': {
      title: '二级菜单',
      order: 1,
      children: {
        submenu3: {
          title: '三级菜单'
        }
      }
    },
    'jump': {
      title: '跳转菜单',
      order: 2
    },
    ':id': {
      title: '跳转页面',
      order: 2,
      hideInMenu: true
    },
    'jumpOutside': {
      title: '跳转外链',
      order: 3,
      link: {
        href: 'https://www.baidu.com',
        target: '_blank'
      }
    }
  }
})
