import axios from 'axios'
import { browserHistory } from 'react-router'
import { Dispatch } from 'redux'
import {
  addPostFailed,
  addPostFulfilled,
  addPostLoading,
  deletePostFailed,
  deletePostFulfilled,
  deletePostLoading,
  fetchPostFailed,
  fetchPostFulfilled,
  fetchPostLoading,
  updatePostFailed,
  updatePostFulfilled,
  updatePostLoading,
} from '../actions/posts-actions'
import { deleteCommentFailed, deleteCommentFulfilled, deleteCommentLoading } from '../actions/posts-actions'
import apiEndpoints from '../config/apis'
import { IComment } from '../types/CommentTypes'
import { IPost } from '../types/PostTypes'
import { getToken } from './utils/authorization-token'

export const getPost = (postId: string) => async (dispatch: Dispatch = null as any) => {
  dispatch(fetchPostLoading())
  try {
    await axios({
      method: 'GET',
      url: `${apiEndpoints.api}/posts/${postId}`,
    })
      .then(res => {
        dispatch(fetchPostFulfilled(res.data))
      })
      .catch(error => {
        dispatch(fetchPostFailed())
      })
  } catch (error) {
    dispatch(fetchPostFailed())
  }
}

export const addPost = (post: IPost) => async (dispatch: Dispatch = null as any) => {
  dispatch(addPostLoading())
  try {
    await axios({
      data: {
        content: post.content,
        title: post.title,
      },
      // axios.defaults.headers.common.Authorization is buggy atm
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'POST',
      url: `${apiEndpoints.api}/posts`,
    }).then(res => {
      dispatch(addPostFulfilled(res.data.post))
      browserHistory.push(`/posts/${res.data.post.id}`)
    })
  } catch (error) {
    dispatch(addPostFailed())
  }
}

export const updatePost = (post: IPost) => async (dispatch: Dispatch = null as any) => {
  dispatch(updatePostLoading())
  try {
    await axios({
      data: {
        content: post.content,
        title: post.title,
      },
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'PUT',
      url: `${apiEndpoints.api}/posts/${post.id}`,
    }).then(res => {
      dispatch(updatePostFulfilled(res.data.post))
      browserHistory.push(`/posts/${res.data.post.id}`)
    })
  } catch (error) {
    dispatch(updatePostFailed())
  }
}

export const deletePost = (postId: string) => async (dispatch: Dispatch = null as any) => {
  dispatch(deletePostLoading())
  try {
    await axios({
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'DELETE',
      url: `${apiEndpoints.api}/posts/${postId}`,
    }).then(() => {
      dispatch(deletePostFulfilled())
      browserHistory.push('/')
    })
  } catch (error) {
    dispatch(deletePostFailed())
  }
}

export const deleteComment = (comment: IComment) => async (dispatch: Dispatch = null as any) => {
  dispatch(deleteCommentLoading())
  try {
    await axios({
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'DELETE',
      url: `${apiEndpoints.api}/comments/${comment.id}`,
    }).then(() => {
      dispatch(deleteCommentFulfilled(comment))
    })
  } catch (error) {
    dispatch(deleteCommentFailed())
  }
}
