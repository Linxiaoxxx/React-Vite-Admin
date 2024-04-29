import type { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import './index.less'
import { App, Button, FloatButton, Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { LeftCircleOutlined, LeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RightCircleOutlined, RightOutlined } from '@ant-design/icons'
import type { ReduxType } from 'redux-type'
import LayoutMenu from './components/Menu'
import LayoutHeader from './components/Header'
import Tabbar from './components/Tabbar'
import LayoutSider from './components/Sider'
import { setCollapsed } from '@/redux/modules/app/action'
import { routerArray } from '@/router'

const { Content } = Layout

const DefaultLayout: FC = () => {
  const dispatch = useDispatch()
  const collapsed = useSelector((state: ReduxType) => state.app.collapsed)

  const location = useLocation()
  const { nodeRef }
    = routerArray.find(route => route.path === location.pathname) ?? {}

  return (
    <Layout className="wh-full overflow-hidden !bg-[#ff8900]">
      <LayoutHeader />

      <Layout>

        <LayoutSider />
        <Content className="relative">
          <div className="wh-full flex flex-col overflow-hidden">

            <Button className="absolute left-[-12px] top-[50%] translate-y-[50%] overflow-hidden focus:outline-none" shape="circle" size="small" icon={collapsed ? <RightOutlined className="!text-12" /> : <LeftOutlined className="!text-12" />} onClick={() => dispatch(setCollapsed(!collapsed))} />
            <Tabbar />
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                nodeRef={nodeRef}
                timeout={300}
                classNames="slide"
                unmountOnExit
              >
                <div ref={nodeRef} className="slide wh-full overflow-hidden">

                  <Outlet />
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </Content>
      </Layout>
    </Layout>

  )
}

export default DefaultLayout
