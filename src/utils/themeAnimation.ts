import { removeCSS, updateCSS } from 'rc-util/lib/Dom/dynamicCSS'

export default function toggleAnimationTheme(event: any, isDark: boolean, updateDom: () => void) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )
  // updateCSS(
  //   `
  //   [data-prefers-color='dark'] {
  //     color-scheme: light !important;
  //   }

  //   [data-prefers-color='light'] {
  //     color-scheme: dark !important;
  //   }
  //   `,
  //   'color-scheme'
  // )

  if (!document.startViewTransition) {
    // Fallback for browsers not supporting `startViewTransition`
    updateDom()
    return
  }

  const transition = document.startViewTransition(async () => {
    await updateDom()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    // removeCSS('color-scheme')
    // updateCSS(
    //   `
    //   * {
    //   transition: none !important;
    // }
    //   `,
    //   'disable-transition'
    // )
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    ).addEventListener('finish', () => {
      // removeCSS('disable-transition')
    })
  })
}
