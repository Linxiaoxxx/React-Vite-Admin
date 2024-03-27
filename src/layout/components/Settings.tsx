import { FireOutlined } from '@ant-design/icons'
import { App, ColorPicker, Divider, Drawer, Flex, InputNumber, Slider, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import type { Color } from 'antd/es/color-picker'
import type { ReduxType } from 'redux-type'
import { setTheme } from '@/redux/modules/app/action'

export default function GlobalSettings(props: any) {
  const dispatch = useDispatch()

  const themeConfig = useSelector((state: ReduxType) => state.app.themeConfig)

  const onThemeChange = (value: Color | number, key: string) => {
    dispatch(setTheme({ [key]: typeof value === 'number' ? value : value.toHexString() }))
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
            <ColorPicker value={themeConfig.primaryColor} onChangeComplete={c => onThemeChange(c, 'primaryColor')} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>明亮背景色</span>
            <ColorPicker value={themeConfig.lightLayoutColor} onChangeComplete={c => onThemeChange(c, 'lightLayoutColor')} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>深色背景色</span>
            <ColorPicker value={themeConfig.darkLayoutColor} onChangeComplete={c => onThemeChange(c, 'darkLayoutColor')} />
          </Flex>
          <Flex justify="space-between" align="center">
            <span>基础圆角</span>
            <Space>
              <Slider className="w-100" value={themeConfig.borderRadius} max={16} onChange={val => onThemeChange(val, 'borderRadius')} />
              <InputNumber className="w-60" value={themeConfig.borderRadius} min={0} max={16} onChange={val => onThemeChange(val ?? 0, 'borderRadius')} />
            </Space>
          </Flex>
        </Space>
      </App>

    </Drawer>
  )
}
