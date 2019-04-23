import { IHomeState } from '../../routes/Home/modules/HomeReducer'
import { IPostState } from '../../routes/Post/modules/PostReducer'
import { ILocationState } from '../../store/reducers/location-reducer'

export interface IRootReducer {
  home: IHomeState
  location: ILocationState
  post: IPostState
}

export interface IAction {
  type?: string
  payload?: any
  [key: string]: any
}
