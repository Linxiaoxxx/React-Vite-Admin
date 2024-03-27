declare module 'redux-type' {
	type Color = GetProp<ColorPickerProps, 'value'>

	interface ThemeConfig {
	  theme: 'dark' | 'light'
	  primaryColor: Color
	  lightLayoutColor: Color
	  darkLayoutColor: Color
	  borderRadius: number
	}

	interface AppState {
	  collapsed: boolean
	  //   menuWidth: number
	  themeConfig: ThemeConfig
	}

	interface UserState {
	  loginStatus: boolean
	  userInfo: Record<string, any>
	  token?: string
	  firstAuthRoute?: Router.RouteObject | null
	}

	interface ReduxType {
	  app: AppState
	  user: UserState
	}
}
