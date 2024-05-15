import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Icons from '@ant-design/icons'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import { useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'
import { routerArray } from '@/router'
import { checkRoutePermission } from '@/router/uitls'

const customIcons: { [key: string]: any } = Icons
function addIcon(name: string | React.ReactNode) {
  return typeof name === 'string' ? React.createElement(customIcons[name]) : name
}

function generateMenu(menuConfig: Router.RouteObject[], auth: string[]) {
  const menus: ItemType[] = []
  menuConfig.forEach((menuItem) => {
    if (!menuItem.meta || menuItem.meta?.hideInMenu) return
    if (!checkRoutePermission(menuItem, auth)) { return }
    const { meta, path, children = [] } = menuItem
    menus.push({
      label: meta.link ? <a href={meta.link?.href} target={`${meta.link.target || '_blank'}`}>{meta!.title}</a> : meta!.title,
      key: meta.link ? `link-${path}` : path,
      icon: meta?.icon ? addIcon(menuItem.meta.icon) : null,
      children: children?.length && generateMenu(children, auth).length
        ? generateMenu(children, auth)
        : undefined
    })
  })
  return menus
}
export default function LayoutMenu() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const permissionList = useSelector(
    (state: ReduxType) => state.user.userInfo?.permission
  )
  const theme = useSelector(
    (state: ReduxType) => state.app.themeConfig.theme
  )

  const handleSelect = ({
    _,
    key
  }: any) => {
    if (key.startsWith('link-')) {
      return
    }
    navigate(key)
  }
  const handleOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  const getOpenKeys = (pathname: string) => {
    const pathSegments = pathname.split('/')
    const openKeys = []
    // 获取当前路由的父级路由
    // 例如：/home/list => ['/home', '/home/list']
    for (let i = 1; i < pathSegments.length; i++) {
      const key = pathSegments.slice(0, i + 1).join('/')
      if (key !== '' && key !== '/') {
        openKeys.push(key)
      }
    }
    return openKeys
  }

  useEffect(() => {
    // 获取当前路由
    setOpenKeys(getOpenKeys(pathname))
    setSelectedKeys([pathname])
  }, [pathname])

  return (
    <Menu
      className="h-full !border-r-none"
      mode="inline"
      items={generateMenu(routerArray, permissionList ?? [])}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      theme={theme}
      onSelect={handleSelect}
      onOpenChange={handleOpenChange}
    />
  )
}
