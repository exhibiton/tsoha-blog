import { IComment } from '../../../types/CommentTypes'

export const FETCH_COMMENT_LOADING = 'FETCH_COMMENT_LOADING'
export type FETCH_COMMENT_LOADING = typeof FETCH_COMMENT_LOADING
export const FETCH_COMMENT_FULFILLED = 'FETCH_COMMENT_FULFILLED'
export type FETCH_COMMENT_FULFILLED = typeof FETCH_COMMENT_FULFILLED
export const FETCH_COMMENT_FAILED = 'FETCH_COMMENT_FAILED'
export type FETCH_COMMENT_FAILED = typeof FETCH_COMMENT_FAILED

export const UPDATE_COMMENT_LOADING = 'UPDATE_COMMENT_LOADING'
export type UPDATE_COMMENT_LOADING = typeof UPDATE_COMMENT_LOADING
export const UPDATE_COMMENT_FULFILLED = 'UPDATE_COMMENT_FULFILLED'
export type UPDATE_COMMENT_FULFILLED = typeof UPDATE_COMMENT_FULFILLED
export const UPDATE_COMMENT_FAILED = 'UPDATE_COMMENT_FAILED'
export type UPDATE_COMMENT_FAILED = typeof UPDATE_COMMENT_FAILED

export const fetchCommentLoading = () => ({
  type: FETCH_COMMENT_LOADING,
})

export const fetchCommentFulfilled = (payload: IComment) => ({
  payload,
  type: FETCH_COMMENT_FULFILLED,
})

export const fetchCommentFailed = () => ({
  type: FETCH_COMMENT_FAILED,
})

export const updateCommentLoading = () => ({
  type: UPDATE_COMMENT_LOADING,
})

export const updateCommentFulfilled = (payload: IComment) => ({
  payload,
  type: UPDATE_COMMENT_FULFILLED,
})

export const updateCommentFailed = () => ({
  type: UPDATE_COMMENT_FAILED,
})
