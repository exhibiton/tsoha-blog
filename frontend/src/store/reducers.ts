import { AnyAction, combineReducers, Reducer } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import HomeReducer from '../routes/Home/modules/HomeReducer'
import PostReducer from '../routes/Post/modules/PostReducer'
import { IRootReducer } from '../types/redux/rootReducerTypes'
import AuthReducer from './reducers/auth-reducer'
import locationReducer from './reducers/location-reducer'

const makeRootReducer = combineReducers({
  auth: AuthReducer,
  form: reduxFormReducer,
  home: HomeReducer,
  location: locationReducer,
  post: PostReducer,
}) as Reducer<IRootReducer>

export default function mainReducer(state: IRootReducer, action: AnyAction): IRootReducer {
  const nextState = makeRootReducer(state || undefined, action)

  return nextState
}
