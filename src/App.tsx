import { theme as AntTheme, ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import type { ReduxType } from 'redux-type'
import AuthRouter from './router/components/AuthRouter'
import Router from '@/router'
import useTheme from '@/hooks/useTheme'

function App() {
  const themeConfig = useSelector((state: ReduxType) => state.app.themeConfig)
  // 引入项目自定义主题切换
  useTheme(themeConfig)

  const themeProvide = useMemo(() => {
    const isDark = themeConfig.theme === 'dark'
    return {

      algorithm: isDark ? AntTheme.darkAlgorithm : AntTheme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: isDark ? themeConfig.darkLayoutColor : themeConfig.lightLayoutColor
        },
        Menu: {
          itemBg: themeConfig.lightLayoutColor,
          darkItemBg: themeConfig.darkLayoutColor,
          subMenuItemBg: themeConfig.lightLayoutColor,
          darkSubMenuItemBg: themeConfig.darkLayoutColor
        }
      },
      token: {
        colorPrimary: themeConfig.primaryColor,
        borderRadius: themeConfig.borderRadius
      }
    }
  }, [themeConfig.theme])
  return (
    <BrowserRouter>
      <ConfigProvider
        locale={zhCN}
        theme={themeProvide}
      >
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App