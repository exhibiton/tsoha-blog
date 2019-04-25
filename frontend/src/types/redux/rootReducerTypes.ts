import { IStatsState } from 'src/routes/Admin/routes/CommentStats/modules/CommentStatsDuck'
import { ICommentState } from '../../routes/Comment/modules/CommentEditReducer'
import { IHomeState } from '../../routes/Home/modules/HomeReducer'
import { IAuthState } from '../../store/reducers/auth-reducer'
import { ILocationState } from '../../store/reducers/location-reducer'
import { IPostState } from '../../store/reducers/posts-reducer'

export interface IRootReducer {
  home: IHomeState
  location: ILocationState
  post: IPostState
  auth: IAuthState
  comment: ICommentState
  stats: IStatsState
}

export interface IAction {
  type?: string
  payload?: any
  [key: string]: any
}
