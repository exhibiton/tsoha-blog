import { IComment } from '../../../types/CommentTypes'
import { IPost } from '../../../types/PostTypes'
import { IAction } from '../../../types/redux/rootReducerTypes'
import { ADD_COMMENT_FAILED, ADD_COMMENT_FULFILLED, ADD_COMMENT_LOADING } from './CommentActions'
import { FETCH_POST_FAILED, FETCH_POST_FULFILLED, FETCH_POST_LOADING } from './PostActions'

export interface IPostState {
  post?: IPost
  isLoading: boolean
  // dirty hack to save time ;)
  comments?: IComment[]
}

const initialState: IPostState = {
  isLoading: false,
  post: null,
}

export default function PostStateReducer(state: IPostState = initialState, action: IAction = {}): IPostState {
  switch (action.type) {
    case ADD_COMMENT_FAILED:
      return { ...state, isLoading: false }
    case ADD_COMMENT_FULFILLED:
      return { ...state, isLoading: false, comments: state.post.comments.concat(action.payload) }
    case ADD_COMMENT_LOADING:
      return { ...state, isLoading: true }
    case FETCH_POST_FAILED:
      return { ...state, isLoading: false }
    case FETCH_POST_FULFILLED:
      return { ...state, isLoading: false, post: action.payload, comments: action.payload.comments }
    case FETCH_POST_LOADING:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
