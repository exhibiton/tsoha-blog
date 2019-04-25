import { AnyAction, combineReducers, Reducer } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import CommentReducer from '../routes/Comment/modules/CommentEditReducer'
import HomeReducer from '../routes/Home/modules/HomeReducer'
import { IRootReducer } from '../types/redux/rootReducerTypes'
import AuthReducer from './reducers/auth-reducer'
import locationReducer from './reducers/location-reducer'
import PostReducer from './reducers/posts-reducer'

const makeRootReducer = combineReducers({
  auth: AuthReducer,
  comment: CommentReducer,
  form: reduxFormReducer,
  home: HomeReducer,
  location: locationReducer,
  post: PostReducer,
}) as Reducer<IRootReducer>

export default function mainReducer(state: IRootReducer, action: AnyAction): IRootReducer {
  const nextState = makeRootReducer(state || undefined, action)

  return nextState
}
