import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'
import LayoutMenu from './Menu'
import { setCollapsed } from '@/redux/modules/app/action'

export default function LayoutSider() {
  const { Sider } = Layout
  const theme = useSelector((state: ReduxType) => state.app.themeConfig.theme)
  const collapsed = useSelector((state: ReduxType) => state.app.collapsed)
  const dispatch = useDispatch()

  return (
    <Sider
      width={200}
      theme={theme}
      collapsible
      trigger={null}
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={56}
      className="normal-border border-r-1 border-r-solid"
      onBreakpoint={(broken) => {
        dispatch(setCollapsed(broken))
      }}
      onCollapse={() => dispatch(setCollapsed(!collapsed))}
    >
      <LayoutMenu />
    </Sider>
  )
}
