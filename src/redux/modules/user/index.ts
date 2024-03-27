import type { AnyAction } from 'redux'
import { produce } from 'immer'
import type { UserState } from 'redux-type'

const userState: UserState = {
  loginStatus: false,
  userInfo: {},
  token: '',
  firstAuthRoute: null
}

// user reducers
function user(state: UserState = userState, action: AnyAction) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'USER_UPDATE':
        return action.payload
      case 'USER_LOGOUT':
        draftState.loginStatus = action.payload
        break
      case 'SET_FIRST_AUTH_ROUTER':
        draftState.firstAuthRoute = action.payload
        break
      default:
        return draftState
    }
  })
}

export default user
