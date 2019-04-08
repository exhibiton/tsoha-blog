import { IPostData } from '../../../types/PostTypes'

export const FETCH_POSTS_LOADING = 'FETCH_POSTS_LOADING'
export type FETCH_POSTS_LOADING = typeof FETCH_POSTS_LOADING
export const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED'
export type FETCH_POSTS_FULFILLED = typeof FETCH_POSTS_FULFILLED
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED'
export type FETCH_POSTS_FAILED = typeof FETCH_POSTS_FAILED

export const fetchPostsLoading = () => ({
  type: FETCH_POSTS_LOADING,
})

export const fetchPostsFulfilled = (payload: IPostData) => ({
  payload,
  type: FETCH_POSTS_FULFILLED,
})

export const fetchPostsFailed = () => ({
  type: FETCH_POSTS_FAILED,
})