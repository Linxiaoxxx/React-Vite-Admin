import type { ThemeConfig } from 'redux-type'

export function setCollapsed(collapsed: boolean) {
  return {
    type: 'SET_COLLAPSED',
    collapsed
  }
}

export function toggleTheme() {
  return {
    type: 'TOGGLE_THEME'
  }
}

export function setTheme(payload: Partial<ThemeConfig>) {
  return {
    type: 'SET_THEME',
    payload
  }
}
