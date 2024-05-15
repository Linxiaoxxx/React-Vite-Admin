import lazyLoad from './components/LazyLoad'
import { RouterSort } from './uitls'

const routersTree: Router.RouteObject[] = []

export function findObjectByPathAndKey(path: string, array: any[]): any {
  for (let i = 0; i < array.length; i++) {
    const obj = array[i]

    // 检查当前对象的路径是否匹配指定的路径
    if (obj.path === path) {
      return obj // 如果路径和键匹配，返回该对象
    }

    // 如果当前对象有 children 属性且为数组，则递归查找
    if (obj.children && Array.isArray(obj.children)) {
      const result = findObjectByPathAndKey(path, obj.children)
      if (result) {
        return result // 如果在子对象中找到匹配的对象，返回该子对象
      }
    }
  }
  return null // 如果未找到匹配的对象，返回 null
}

/**
 * 展开所有子路由元素
 * @param obj
 * @param path
 * @returns obj
 */
function flattenMeta(obj: Record<string, Router.MetaProps>, path = '') {
  const newObj: Record<string, Router.MetaProps> = {}
  for (const key in obj) {
    const { children, ...rest } = obj[key]
    newObj[`${path ? `${path}/` : ''}${key}`] = rest
    if (children) {
      Object.assign(newObj, flattenMeta(children, `${path}/${key}`))
    }
  }
  return newObj
}

/**
 * 构建路由配置
 * @returns Record<string, Router.MetaProps>
 */
function getRouterConfig() {
  const configs = import.meta.glob<Router.MetaProps>('../views/**/meta.(ts|tsx)', { eager: true, import: 'default' })
  return Object.keys(configs).reduce((acc: Record<string, Router.MetaProps>, cur) => {
    const path = cur.replace(/\.\.\/views|\.tsx|\/meta\.tsx|\/meta\.ts/g, '').replace('/$', '$').replace(/\$(\w+)/g, '/:$1') || '/'
    const { children, ...rest } = configs[cur]
    acc[path] = rest
    if (children) {
      Object.assign(acc, flattenMeta(children, path))
    }
    return acc
  }, {})
}
export const configMap: Record<string, Router.MetaProps> = getRouterConfig()

function generateByMeta() {
  const ignorePath = ['login', 'exception', 'components', 'component', 'meta']
  const checkIgnore = (path: string) => ignorePath.some(item => path.includes(item))
  const modules = import.meta.glob<any>('../views/**/*.tsx', { eager: true, import: 'default' })
  const componentModules = Object.keys(modules).filter(key => !checkIgnore(key)).reduce((result: any, key) => {
    const pathFilter = key.replace(/\.\.\/views|\.tsx|\/index/g, '').replace('/$', '$').replace(/\$(\w+)/g, '/:$1')
    const pathMatch = key.match(/\/views(.*?)\/index\.tsx/)
    const path = pathFilter || pathMatch![1] || '/'
    result[path] = modules[key]
    return result
  }, {})

  function createRouter(path: string, childrenPath?: string): any {
    const Component = componentModules[path] || null
    const router: any = {
      path,
      meta: configMap[path] || { title: path },
      nodeRef: createRef(),
      element: Component ? lazyLoad(Component) : null
    }
    if (childrenPath) {
      router.children = [createRouter(childrenPath)]
    }
    return router
  }
  function handleRouter(parentPath: string, currentPath: string, result: any[]) {
    if (parentPath) {
      const parent = findObjectByPathAndKey(parentPath, result) || null
      if (parent && !findObjectByPathAndKey(currentPath, result)) {
        parent.children = parent.children || []
        parent.children.push(createRouter(currentPath))
      }
      else {
        if (!findObjectByPathAndKey(parentPath, result)) {
          result.push(createRouter(parentPath, currentPath))
        }
      }
    }
    else {
      if (!findObjectByPathAndKey(currentPath, result)) {
        result.push(createRouter(currentPath))
      }
    }
  }
  Object.keys(configMap).forEach((path) => {
    const matchArr = path.split('/').filter(item => !!item)
    if (!matchArr.length) {
      // 匹配单/首页
      handleRouter('', path, routersTree)
    }
    let parentPath = ''
    let currentPath = `/${matchArr[0]}`
    let params = ''

    for (let i = 1; i <= matchArr.length; i++) {
      if (matchArr[i]) {
        if (matchArr[i].startsWith(':')) {
          params += `/${matchArr[i]}`
          if (i === matchArr.length - 1) {
            parentPath = currentPath
            currentPath += params
            handleRouter(parentPath, currentPath, routersTree)
          }
        }
        else {
          if (params) {
            parentPath = currentPath
            currentPath += params
            handleRouter(parentPath, currentPath, routersTree)
          }
          else {
            handleRouter(parentPath, currentPath, routersTree)
          }
          parentPath = currentPath
          currentPath = `${currentPath}/${matchArr[i]}`
        }
      }
      else {
        handleRouter(parentPath, currentPath, routersTree)
      }
    }
  })
  // 添加一个根路由重定向地址，避免找不到父路由显示空白页面，且顺序很重要！！！
  return RouterSort(routersTree).map((item) => {
    return !item.element && item?.children?.length ? [{ path: item.path, element: <Navigate to={item.children[0].path} /> }, item] : item
  }).flat(2)
}

export default generateByMeta
