import { IComment } from 'src/types/CommentTypes'

export const ADD_COMMENT_LOADING = 'ADD_COMMENT_LOADING'
export type ADD_COMMENT_LOADING = typeof ADD_COMMENT_LOADING
export const ADD_COMMENT_FULFILLED = 'ADD_COMMENT_FULFILLED'
export type ADD_COMMENT_FULFILLED = typeof ADD_COMMENT_FULFILLED
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED'
export type ADD_COMMENT_FAILED = typeof ADD_COMMENT_FAILED

export const addCommentLoading = () => ({
  type: ADD_COMMENT_LOADING,
})

export const addCommentFulfilled = (payload: IComment) => ({
  payload,
  type: ADD_COMMENT_FULFILLED,
})

export const addCommentFailed = () => ({
  type: ADD_COMMENT_FAILED,
})
