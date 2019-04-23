import axios from 'axios'
import { Dispatch } from 'redux'
import apiEndpoints from '../../../config/apis'
import { fetchPostFailed, fetchPostFulfilled, fetchPostLoading } from './PostActions'

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
