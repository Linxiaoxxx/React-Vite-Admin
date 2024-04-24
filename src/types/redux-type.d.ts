declare module 'redux-type' {
	type Color = GetProp<ColorPickerProps, 'value'>

	interface ThemeConfig {
	  theme: 'dark' | 'light'
	  primaryColor: Color
	  lightLayoutColor: Color
	  darkLayoutColor: Color
	  borderRadius: number
	}

	interface TagProps extends Router.MetaProps {
	  path: string
	}

	interface AppState {
	  collapsed: boolean
	  //   menuWidth: number
	  themeConfig: ThemeConfig
	  tagList: TagProps[]
	}

	interface UserInfo {
	  name: string
	  avatar?: string
	  userid?: string
	  permission: string[]
	}
	interface UserState {
	  loginStatus: boolean
	  userInfo: UserInfo | null
	  token?: string
	  firstAuthRoute?: Router.RouteObject | null
	}

	interface ReduxType {
	  app: AppState
	  user: UserState
	}
}
