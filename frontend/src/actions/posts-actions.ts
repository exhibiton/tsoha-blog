import { IPost } from 'src/types/PostTypes'
import { IComment } from '../types/CommentTypes'

export const FETCH_POST_LOADING = 'FETCH_POST_LOADING'
export type FETCH_POST_LOADING = typeof FETCH_POST_LOADING
export const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED'
export type FETCH_POST_FULFILLED = typeof FETCH_POST_FULFILLED
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED'
export type FETCH_POST_FAILED = typeof FETCH_POST_FAILED

export const ADD_POST_LOADING = 'ADD_POST_LOADING'
export type ADD_POST_LOADING = typeof ADD_POST_LOADING
export const ADD_POST_FULFILLED = 'ADD_POST_FULFILLED'
export type ADD_POST_FULFILLED = typeof ADD_POST_FULFILLED
export const ADD_POST_FAILED = 'ADD_POST_FAILED'
export type ADD_POST_FAILED = typeof ADD_POST_FAILED

export const UPDATE_POST_LOADING = 'UPDATE_POST_LOADING'
export type UPDATE_POST_LOADING = typeof UPDATE_POST_LOADING
export const UPDATE_POST_FULFILLED = 'UPDATE_POST_FULFILLED'
export type UPDATE_POST_FULFILLED = typeof UPDATE_POST_FULFILLED
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED'
export type UPDATE_POST_FAILED = typeof UPDATE_POST_FAILED

export const DELETE_POST_LOADING = 'DELETE_POST_LOADING'
export type DELETE_POST_LOADING = typeof DELETE_POST_LOADING
export const DELETE_POST_FULFILLED = 'DELETE_POST_FULFILLED'
export type DELETE_POST_FULFILLED = typeof DELETE_POST_FULFILLED
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'
export type DELETE_POST_FAILED = typeof DELETE_POST_FAILED

export const DELETE_COMMENT_LOADING = 'DELETE_COMMENT_LOADING'
export type DELETE_COMMENT_LOADING = typeof DELETE_COMMENT_LOADING
export const DELETE_COMMENT_FULFILLED = 'DELETE_COMMENT_FULFILLED'
export type DELETE_COMMENT_FULFILLED = typeof DELETE_COMMENT_FULFILLED
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED'
export type DELETE_COMMENT_FAILED = typeof DELETE_COMMENT_FAILED

export const deleteCommentLoading = () => ({
  type: DELETE_COMMENT_LOADING,
})

export const deleteCommentFulfilled = (payload: IComment) => ({
  payload,
  type: DELETE_COMMENT_FULFILLED,
})

export const deleteCommentFailed = () => ({
  type: DELETE_COMMENT_FAILED,
})

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

export const deletePostLoading = () => ({
  type: DELETE_POST_LOADING,
})

export const deletePostFulfilled = () => ({
  type: DELETE_POST_FULFILLED,
})

export const deletePostFailed = () => ({
  type: DELETE_POST_FAILED,
})

export const addPostLoading = () => ({
  type: ADD_POST_LOADING,
})

export const addPostFulfilled = (payload: IPost) => ({
  payload,
  type: ADD_POST_FULFILLED,
})

export const addPostFailed = () => ({
  type: ADD_POST_FAILED,
})

export const updatePostLoading = () => ({
  type: UPDATE_POST_LOADING,
})

export const updatePostFulfilled = (payload: IPost) => ({
  payload,
  type: UPDATE_POST_FULFILLED,
})

export const updatePostFailed = () => ({
  type: UPDATE_POST_FAILED,
})
