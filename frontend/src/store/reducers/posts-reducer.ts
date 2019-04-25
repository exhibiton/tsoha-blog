import { IComment } from 'src/types/CommentTypes'
import { IPost } from 'src/types/PostTypes'
import {
  ADD_POST_FAILED,
  ADD_POST_FULFILLED,
  ADD_POST_LOADING,
  DELETE_POST_FAILED,
  DELETE_POST_FULFILLED,
  DELETE_POST_LOADING,
  FETCH_POST_FAILED,
  FETCH_POST_FULFILLED,
  FETCH_POST_LOADING,
  UPDATE_POST_FAILED,
  UPDATE_POST_FULFILLED,
  UPDATE_POST_LOADING,
} from '../../actions/posts-actions'
import {
  ADD_COMMENT_FAILED,
  ADD_COMMENT_FULFILLED,
  ADD_COMMENT_LOADING,
} from '../../routes/Post/modules/CommentActions'
import { IAction } from '../../types/redux/rootReducerTypes'

export interface IPostState {
  post?: IPost
  isLoading: boolean
  // dirty hack to save time ;)
  comments?: IComment[]
}

const initialState: IPostState = {
  comments: null,
  isLoading: false,
  post: null,
}

export default function PostStateReducer(state: IPostState = initialState, action: IAction = {}): IPostState {
  switch (action.type) {
    case ADD_POST_FAILED:
    case DELETE_POST_FAILED:
    case UPDATE_POST_FAILED:
    case ADD_COMMENT_FAILED:
    case FETCH_POST_FAILED:
      return { ...state, isLoading: false }
    case ADD_COMMENT_FULFILLED:
      return { ...state, isLoading: false, comments: state.post.comments.concat(action.payload) }
    case FETCH_POST_FULFILLED:
      return { ...state, isLoading: false, post: action.payload, comments: action.payload.comments }
    case DELETE_POST_FULFILLED:
      return { ...state, isLoading: false, post: null }
    case ADD_POST_FULFILLED:
    case UPDATE_POST_FULFILLED:
      return { ...state, isLoading: false, post: action.payload }
    case ADD_POST_LOADING:
    case UPDATE_POST_LOADING:
    case DELETE_POST_LOADING:
    case FETCH_POST_LOADING:
    case ADD_COMMENT_LOADING:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
