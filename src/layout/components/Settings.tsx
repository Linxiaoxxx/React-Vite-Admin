import { FireOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { App, ColorPicker, Divider, Drawer, Flex, InputNumber, Slider, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import type { Color } from 'antd/es/color-picker'
import type { ReduxType } from 'redux-type'
import { setTheme } from '@/redux/modules/app/action'

export default function GlobalSettings(props: any) {
  const dispatch = useDispatch()

  const themeConfig = useSelector((state: ReduxType) => state.app.themeConfig)

  const onThemeChange = (data: any) => {
    dispatch(setTheme({ ...data }))
  }
  return (
    <Drawer
      title="主题设置"
      width={320}
      open={props.visible}
      onClose={() => props.toggleSetting(false)}
    >
      {/* 使用App组件包裹，使原生组件支持主题色 */}
      <App>
        {/* 全局主题 */}
        <Divider className="divider">
          <FireOutlined />
          全局主题
        </Divider>
        <Space direction="vertical" className="w-full">
          <Flex justify="space-between" align="center">
            <span>主题颜色</span>
            <ColorPicker value={themeConfig.primaryColor} onChangeComplete={c => onThemeChange({ primaryColor: c.toHexString() })} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>基础圆角</span>
            <Space>
              <Slider className="w-100" value={themeConfig.borderRadius} max={16} onChange={val => onThemeChange({ borderRadius: val })} />
              <InputNumber className="w-60" value={themeConfig.borderRadius} min={0} max={16} onChange={val => onThemeChange({ borderRadius: val ?? 0 })} />
            </Space>
          </Flex>
        </Space>
        <Divider className="divider">
          <SunOutlined />
          明亮主题
        </Divider>
        <Space direction="vertical" className="w-full">
          <Flex justify="space-between" align="center">
            <span>主背景色</span>
            <ColorPicker value={themeConfig.light.bodyBg} onChangeComplete={c => onThemeChange({ light: { ...themeConfig.light, bodyBg: c.toHexString() } })} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>头部背景色</span>
            <ColorPicker value={themeConfig.light.headerBg} onChangeComplete={c => onThemeChange({ light: { ...themeConfig.light, headerBg: c.toHexString() } })} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>侧边栏背景色</span>
            <ColorPicker value={themeConfig.light.siderBg} onChangeComplete={c => onThemeChange({ light: { ...themeConfig.light, siderBg: c.toHexString() } })} />
          </Flex>
        </Space>
        <Divider className="divider">
          <MoonOutlined />
          深色主题
        </Divider>
        <Space direction="vertical" className="w-full">
          <Flex justify="space-between" align="center">
            <span>主背景色</span>
            <ColorPicker value={themeConfig.dark.bodyBg} onChangeComplete={c => onThemeChange({ dark: { ...themeConfig.dark, bodyBg: c } })} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>头部背景色</span>
            <ColorPicker value={themeConfig.dark.headerBg} onChangeComplete={c => onThemeChange({ dark: { ...themeConfig.dark, headerBg: c } })} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>侧边栏背景色</span>
            <ColorPicker value={themeConfig.dark.siderBg} onChangeComplete={c => onThemeChange({ dark: { ...themeConfig.dark, siderBg: c } })} />
          </Flex>
        </Space>
      </App>

    </Drawer>
  )
}
