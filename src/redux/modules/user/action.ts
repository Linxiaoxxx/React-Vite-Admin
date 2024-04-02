import type { UserState } from 'redux-type'

export function userUpdate(payload: Partial<UserState>) {
  return {
    type: 'USER_UPDATE',
    payload
  }
}

export function userLogout() {
  return {
    type: 'USER_LOGOUT'
  }
}

export function setFirstAuthRouter(payload: Router.RouteObject | null) {
  return {
    type: 'SET_FIRST_AUTH_ROUTER',
    payload
  }
}
