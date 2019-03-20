import { AnyAction, combineReducers, Reducer } from 'redux'
import { IRootReducer } from '../types/redux/rootReducerTypes'
import locationReducer from './reducers/location-reducer'


const makeRootReducer = combineReducers({
  location: locationReducer,
}) as Reducer<IRootReducer>

export default function mainReducer(state: IRootReducer, action: AnyAction): IRootReducer {
  const nextState = makeRootReducer(state || undefined, action)

  return nextState
}