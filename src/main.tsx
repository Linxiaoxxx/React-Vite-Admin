import ReactDOM from 'react-dom/client'
import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import '@/assets/style/common.less'
import '@/assets/style/theme.less'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux'
import App from './App'
import './request/mock/home'

export function Index() {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

let root = null
if (!root) {
  root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  root.render(
    <Index />
  )
}
