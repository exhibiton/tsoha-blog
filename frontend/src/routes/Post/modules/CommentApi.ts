import axios from 'axios'
import { Dispatch } from 'redux'
import { getToken } from '../../../api/utils/authorization-token'
import apiEndpoints from '../../../config/apis'
import { addCommentFailed, addCommentFulfilled, addCommentLoading } from './CommentActions'

export const addComment = (comment: string, postId: string) => async (dispatch: Dispatch = null as any) => {
  const data = {
    content: comment,
    post_id: postId,
  }
  dispatch(addCommentLoading())
  try {
    await axios({
      // axios.defaults.headers.common.Authorization is buggy atm
      data,
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'POST',
      url: `${apiEndpoints.api}/comments`,
    }).then(res => {
      dispatch(addCommentFulfilled(res.data.comment))
    })
  } catch (error) {
    dispatch(addCommentFailed())
  }
}
