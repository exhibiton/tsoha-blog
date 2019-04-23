import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT } from '../../actions/auth-actions'
import { IAction } from '../../types/redux/rootReducerTypes'
import { IUser } from '../../types/UserTypes'

export interface IAuthState {
  currentUser: IUser
  isSignedIn: boolean
  isSigningIn: boolean
}

const initialState: IAuthState = {
  currentUser: null,
  isSignedIn: false,
  isSigningIn: true,
}

export default function AuthReducer(state: IAuthState = initialState, action: IAction = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.identity,
        isSignedIn: true,
        isSigningIn: false,
      }

    case LOGIN_LOADING:
      return {
        ...state,
        isSigningIn: true,
      }

    case LOGOUT:
      return {
        ...state,
        currentUser: {},
        isSignedIn: false,
      }

    case LOGIN_FAIL:
      return {
        ...state,
        isSignedIn: false,
        isSigningIn: false,
      }

    default:
      return state
  }
}
