import { IPost } from '../../../types/PostTypes'
import { IAction } from '../../../types/redux/rootReducerTypes'
import { FETCH_POST_FAILED, FETCH_POST_FULFILLED, FETCH_POST_LOADING } from './PostActions'

export interface IPostState {
  post?: IPost
  isLoading: boolean
}

const initialState: IPostState = {
  isLoading: false,
  post: null,
}

export default function PostStateReducer(state: IPostState = initialState, action: IAction = {}): IPostState {
  switch (action.type) {
    case FETCH_POST_FAILED:
      return { ...state, isLoading: false }
    case FETCH_POST_FULFILLED:
      return { ...state, isLoading: false, post: action.payload }
    case FETCH_POST_LOADING:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
