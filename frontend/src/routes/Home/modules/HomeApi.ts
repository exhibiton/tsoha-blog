import axios from 'axios'
import { Dispatch } from 'redux'
import apiEndpoints from '../../../config/apis'
import { fetchPostsFailed, fetchPostsFulfilled, fetchPostsLoading } from './HomeActions'

export const getPosts = () => async (dispatch: Dispatch = null as any) => {
  dispatch(fetchPostsLoading())
  try {
    await axios({
      method: 'GET',
      url: `${apiEndpoints.api}/posts`,
    })
      .then(res => {
        dispatch(fetchPostsFulfilled(res.data))
      })
      .catch(error => {
        dispatch(fetchPostsFailed())
      })
  } catch (error) {
    dispatch(fetchPostsFailed())
  }
}
