import { IPost } from '../../../types/PostTypes'
import { IAction } from '../../../types/redux/rootReducerTypes'
import { FETCH_POSTS_FAILED, FETCH_POSTS_FULFILLED, FETCH_POSTS_LOADING } from './HomeActions'

export interface IHomeState {
  readonly posts?: IPost[]
  isLoading: boolean
}

const initialState: IHomeState = {
  isLoading: false,
  posts: []
}

export default function HomeStateReducer(state: IHomeState = initialState, action: IAction = {}): IHomeState {
  switch (action.type) {
    case FETCH_POSTS_FAILED:
      return { ...state, isLoading: false }
    case FETCH_POSTS_FULFILLED:
      return { ...state, isLoading: false, posts: action.payload }
    case FETCH_POSTS_LOADING:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
