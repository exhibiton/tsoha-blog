import { IComment } from '../../../types/CommentTypes'
import { IAction } from '../../../types/redux/rootReducerTypes'
import {
  DELETE_COMMENT_FAILED,
  DELETE_COMMENT_FULFILLED,
  DELETE_COMMENT_LOADING,
  FETCH_COMMENT_FAILED,
  FETCH_COMMENT_FULFILLED,
  FETCH_COMMENT_LOADING,
  UPDATE_COMMENT_FAILED,
  UPDATE_COMMENT_FULFILLED,
  UPDATE_COMMENT_LOADING,
} from './CommentEditActions'

export interface ICommentState {
  comment?: IComment
  isLoading: boolean
}

const initialState: ICommentState = {
  comment: null,
  isLoading: false,
}

export default function CommentEditStateReducer(
  state: ICommentState = initialState,
  action: IAction = {},
): ICommentState {
  switch (action.type) {
    case FETCH_COMMENT_FAILED:
      return { ...state, isLoading: false }
    case DELETE_COMMENT_FAILED:
      return { ...state, isLoading: false }
    case UPDATE_COMMENT_FAILED:
      return { ...state, isLoading: false }
    case DELETE_COMMENT_FULFILLED:
      return { ...state, isLoading: false, comment: null }
    case FETCH_COMMENT_FULFILLED:
      return { ...state, isLoading: false, comment: action.payload }
    case UPDATE_COMMENT_FULFILLED:
      return { ...state, isLoading: false, comment: action.payload }
    case FETCH_COMMENT_LOADING:
      return { ...state, isLoading: true }
    case UPDATE_COMMENT_LOADING:
      return { ...state, isLoading: true }
    case DELETE_COMMENT_LOADING:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
