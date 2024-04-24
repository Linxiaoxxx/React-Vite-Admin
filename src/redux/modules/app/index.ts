import type { AnyAction } from 'redux'
import { produce } from 'immer'
import type { AppState } from 'redux-type'

const appState: AppState = {
  collapsed: false,
  themeConfig: {
    theme: 'light',
    primaryColor: '#1890ff',
    lightLayoutColor: '#fff',
    darkLayoutColor: '#131313',
    borderRadius: 8
  },
  tagList: [{
    path: '/',
    title: '首页'
  }]
}

// user reducers
function App(state: AppState = appState, action: AnyAction) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'SET_COLLAPSED':
        draftState.collapsed = action.collapsed
        break
      case 'TOGGLE_THEME':
        draftState.themeConfig.theme = draftState.themeConfig.theme === 'dark' ? 'light' : 'dark'
        break
      case 'SET_THEME':
        Object.assign(draftState.themeConfig, action.payload)
        break
      case 'UPDATE_TAG_LIST':
        draftState.tagList = action.payload
        break
      default:
        return draftState
    }
  })
}

export default App
