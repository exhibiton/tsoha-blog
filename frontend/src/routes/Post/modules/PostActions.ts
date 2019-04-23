import { IPost } from '../../../types/PostTypes'

export const FETCH_POST_LOADING = 'FETCH_POST_LOADING'
export type FETCH_POST_LOADING = typeof FETCH_POST_LOADING
export const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED'
export type FETCH_POST_FULFILLED = typeof FETCH_POST_FULFILLED
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED'
export type FETCH_POST_FAILED = typeof FETCH_POST_FAILED

export const fetchPostLoading = () => ({
  type: FETCH_POST_LOADING,
})

export const fetchPostFulfilled = (payload: IPost) => ({
  payload,
  type: FETCH_POST_FULFILLED,
})

export const fetchPostFailed = () => ({
  type: FETCH_POST_FAILED,
})
