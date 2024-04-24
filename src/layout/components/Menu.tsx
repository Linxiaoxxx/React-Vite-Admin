// import { routerArray } from "@/router";
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Icons from '@ant-design/icons'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import { useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'
import { routerArray } from '@/router'
import { checkRoutePermission } from '@/router/uitls'

type MenuItem = Required<MenuProps>['items'][number]

const customIcons: { [key: string]: any } = Icons
function addIcon(name: string) {
  return React.createElement(customIcons[name])
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

function generateMenu(menuConfig: Router.RouteObject[], auth: string[]) {
  const menus: ItemType[] = []
  menuConfig.forEach((menuItem) => {
    if (!menuItem.meta || menuItem.meta?.hideInMenu) return
    if (!checkRoutePermission(menuItem, auth)) { return }
    // console.log('menuItem', menuItem)

    menus.push(
      getItem(
        menuItem.meta!.title,
        menuItem.path,
        menuItem.meta?.icon ? addIcon(menuItem.meta.icon) : null,
        menuItem?.children?.length && generateMenu(menuItem.children, auth).length
          ? generateMenu(menuItem.children, auth)
          : undefined
      )
    )
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
    // const path = keyPath.reverse().join('/')
    navigate(key)
  }
  const handleOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  useEffect(() => {
    // 获取当前路由
    setOpenKeys(pathname.split('/').map((p: string) => `/${p}`))
    setSelectedKeys([pathname])
  }, [pathname])

  return (
    <Menu
      className="h-full border-r-none"
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
