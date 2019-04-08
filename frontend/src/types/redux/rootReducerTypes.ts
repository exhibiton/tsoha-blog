import { IHomeState } from '../../routes/Home/modules/HomeReducer'
import { ILocationState } from '../../store/reducers/location-reducer'

export interface IRootReducer {
  home: IHomeState
  location: ILocationState
}

export interface IAction {
  type?: string
  payload?: any
  [key: string]: any
}
