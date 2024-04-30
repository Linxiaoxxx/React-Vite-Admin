import type { ThemeConfig } from 'redux-type'

/**
 * @description 全局主题设置
 */
function useTheme(themeConfig: ThemeConfig) {
  const isDark = themeConfig.theme === 'dark'
  const initTheme = () => {
    // 切换暗黑模式
    // const head = document.getElementsByTagName('head')[0]
    // const getStyle = head.getElementsByTagName('link')
    // if (getStyle.length > 0) {
    //   for (let i = 0, l = getStyle.length; i < l; i++) {
    //     if (getStyle[i]?.getAttribute('data-type') === 'dark') getStyle[i].remove()
    //   }
    // }

    // const linkDom = document.createElement('link')
    // linkDom.dataset.type = 'dark'
    // linkDom.rel = 'stylesheet'
    // linkDom.href = (isDark ? '/src/assets/style/theme-dark.less' : '/src/assets/style/theme-default.less') as string
    // head.appendChild(linkDom)

    const body = document.getElementsByTagName('head')[0]
    if (!isDark && body.className.includes('dark')) {
      body.className = body.className.replace('dark', '')
    }
    body.className = isDark ? 'dark' : ''
  }
  initTheme()

  return {
    initTheme
  }
}

export default useTheme
