import { IHomeState } from '../../routes/Home/modules/HomeReducer'
import { IPostState } from '../../routes/Post/modules/PostReducer'
import { IAuthState } from '../../store/reducers/auth-reducer'
import { ILocationState } from '../../store/reducers/location-reducer'

export interface IRootReducer {
  home: IHomeState
  location: ILocationState
  post: IPostState
  auth: IAuthState
}

export interface IAction {
  type?: string
  payload?: any
  [key: string]: any
}
