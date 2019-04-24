import axios from 'axios'
import { Dispatch } from 'redux'
import { IComment } from 'src/types/CommentTypes'
import { getToken } from '../../../api/utils/authorization-token'
import apiEndpoints from '../../../config/apis'
import {
  fetchCommentFailed,
  fetchCommentFulfilled,
  fetchCommentLoading,
  updateCommentFailed,
  updateCommentFulfilled,
  updateCommentLoading,
} from './CommentEditActions'

export const getComment = (commentId: string) => async (dispatch: Dispatch = null as any) => {
  dispatch(fetchCommentLoading())
  try {
    await axios({
      // axios.defaults.headers.common.Authorization is buggy atm
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'GET',
      url: `${apiEndpoints.api}/comments/${commentId}`,
    })
      .then(res => {
        dispatch(fetchCommentFulfilled(res.data))
      })
      .catch(error => {
        dispatch(fetchCommentFailed())
      })
  } catch (error) {
    dispatch(fetchCommentFailed())
  }
}

export const updateComment = (comment: IComment) => async (dispatch: Dispatch = null as any) => {
  dispatch(updateCommentLoading())
  try {
    await axios({
      data: {
        content: comment.content,
      },
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'PUT',
      url: `${apiEndpoints.api}/comments/${comment.id}`,
    }).then(res => {
      dispatch(updateCommentFulfilled(res.data.comment))
    })
  } catch (error) {
    dispatch(updateCommentFailed())
  }
}
