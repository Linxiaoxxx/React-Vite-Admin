import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown, Flex, Layout, Space, Switch, Tooltip, theme } from 'antd'
import {
  SkinOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'
import Settings from './Settings'
import { toggleTheme } from '@/redux/modules/app/action'
import toggleAnimationTheme from '@/utils/themeAnimation'

export default function LayoutHeader() {
  const { Header } = Layout
  const dispatch = useDispatch()
  const { useToken } = theme
  const {
    token: { colorBgElevated }
  } = useToken()
  const animateRef = useRef<{ colorBgElevated: string }>({ colorBgElevated })

  const [settingVisible, setSettingVisible] = useState(false)
  const isDark = useSelector((state: ReduxType) => state.app.themeConfig.theme === 'dark')

  const userItems: MenuProps['items'] = [
    {
      key: 'about',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          关于我们
        </a>
      )
    },
    {
      key: 'logout',
      label: (
        <Button type="text">退出登录</Button>
      )
    }
  ]

  function handleChangeTheme(e: any) {
    const updateDom = () => {
      document
        .querySelector('html')
        ?.setAttribute('data-prefers-color', !isDark ? 'dark' : 'light')
      const root = document.documentElement
      root.classList.remove(isDark ? 'dark' : 'light')
      root.classList.add(isDark ? 'light' : 'dark')
      setTimeout(() => {
        dispatch(toggleTheme())
      })
    }

    toggleAnimationTheme(e, isDark, updateDom)
  }

  useEffect(() => {
    if (colorBgElevated !== animateRef.current.colorBgElevated) {
      animateRef.current.colorBgElevated = colorBgElevated
    }
  }, [colorBgElevated])

  return (
    <Header className="normal-border border-b-1 border-b-solid px-24 shadow-[rgba(0,0,0,0.03)] shadow-md">
      <Flex justify="space-between">

        <div className="text-18 font-500">RVT</div>

        <Space size={24}>

          <Switch checked={isDark} checkedChildren="🌜" unCheckedChildren="🌞" onClick={(_, e) => handleChangeTheme(e)} />

          <Tooltip title="风格设置">
            <SkinOutlined className="text-16" onClick={() => setSettingVisible(true)} />
          </Tooltip>
          <Dropdown menu={{ items: userItems }}>
            <Avatar className="cursor-point">admin</Avatar>
          </Dropdown>
        </Space>
      </Flex>
      <Settings visible={settingVisible} toggleSetting={() => { setSettingVisible(false) }} />

    </Header>

  )
}
