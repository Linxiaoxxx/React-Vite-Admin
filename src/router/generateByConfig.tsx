import React from 'react'
import lazyLoad from './components/LazyLoad'
import routerConfig from './config'
import NavigateFun from './components/NavigateFun'

export const routersTree: any[] = []

function findObjectByPathAndKey(path: string, array: any[]): any {
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

// function matching3(path: string, result: any[] = []) {
//   const matchArr = path.split('/').filter(item => !!item)
//   let parentPath = ''
//   let currentPath = `/${matchArr[0]}`
//   let params = ''

//   for (let i = 1; i <= matchArr.length; i++) {
//     if (matchArr[i]) {
//       if (matchArr[i].startsWith(':')) {
//         params += `/${matchArr[i]}`
//         if (i === matchArr.length - 1) {
//           parentPath = currentPath
//           currentPath += params
//           handleRouter(parentPath, currentPath, result)
//         }
//       }
//       else {
//         if (params) {
//           parentPath = currentPath
//           currentPath += params
//           handleRouter(parentPath, currentPath, result)
//         }
//         else {
//           handleRouter(parentPath, currentPath, result)
//         }
//         parentPath = currentPath
//         currentPath = `${currentPath}/${matchArr[i]}`
//       }
//     }
//     else {
//       handleRouter(parentPath, currentPath, result)
//     }
//   }
//   return result
// }

// realPath, filePath,--- pathMap
// pathMap has this path -- element
function generateRouterByMeta2() {
  const ignorePath = ['login', 'exception', 'components', 'component']
  const checkIgnore = (path: string) => ignorePath.some(item => path.includes(item))
  const modules = import.meta.glob<any>('../views/**/*.tsx', { eager: true, import: 'default' })
  console.log('modules', modules)

  const keys: string[] = Object.keys(modules)
    .filter(key => !checkIgnore(key)).map((key) => {
      const pathFilter = key.replace(/\.\.\/views|\.tsx|\/index/g, '').replace('/$', '$').replace(/\$(\w+)/g, '/:$1')
      const pathMatch = key.match(/\/views(.*?)\/index\.tsx/)
      const path = pathFilter || pathMatch![1] || '/'
      return path
    })
  console.log('keys', keys)
  function createRouter(path: string, childrenPath?: string): any {
    const comPath = keys.includes(path) ? `../views${path}/index.tsx` : ''
    const Components = modules[comPath] || null
    const router: any = {
      path,
      meta: routerConfig[path] || { title: path },
      nodeRef: createRef(),
      element: Components ? <Components /> : null
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
        if (!parent.element) {
          // 给父路由一个重定向地址
          // parent.element = lazyLoad(React.lazy(() => import(`../views${currentPath}.tsx`)))
          // parent.element = NavigateFun({ path: currentPath })
        }
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
  keys.forEach((path) => {
    // matching3(key, routersTree)
    const matchArr = path.split('/').filter(item => !!item)
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
  // console.log('routersTree', routersTree)

  return routersTree
}

// const a = generateRouterByMeta2()
export default generateRouterByMeta2
