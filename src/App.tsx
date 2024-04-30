import type { ThemeConfig } from 'antd'
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

  const themeProvide = useMemo<ThemeConfig>(() => {
    const isDark = themeConfig.theme === 'dark'
    return {
      algorithm: isDark ? AntTheme.darkAlgorithm : AntTheme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: isDark ? themeConfig.dark.headerBg : themeConfig.light.headerBg,
          bodyBg: isDark ? themeConfig.dark.bodyBg : themeConfig.light.bodyBg
        },
        Menu: {
          subMenuItemBg: 'transparent',
          darkSubMenuItemBg: 'transparent',
          itemBg: themeConfig.light.siderBg,
          darkItemBg: themeConfig.dark.siderBg

        }
      },
      token: {
        colorPrimary: themeConfig.primaryColor,
        borderRadius: themeConfig.borderRadius
      },
      cssVar: true,
      hashed: false
    }
  }, [themeConfig])
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
