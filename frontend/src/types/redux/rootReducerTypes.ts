import { ILocationState } from '../../store/reducers/location-reducer'

export interface IRootReducer {
  location: ILocationState
}

export interface IAction {
  type?: string
  payload?: any
  [key: string]: any
}
