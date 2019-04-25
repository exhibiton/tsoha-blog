import axios from 'axios'
import { Dispatch } from 'redux'
import { getToken } from 'src/api/utils/authorization-token'
import apiEndpoints from '../../../../../config/apis'
import { IAction } from '../../../../../types/redux/rootReducerTypes'

// Actions & Types

export const FETCH_STATS_LOADING = 'FETCH_STATS_LOADING'
export type FETCH_STATS_LOADING = typeof FETCH_STATS_LOADING
export const FETCH_STATS_FULFILLED = 'FETCH_STATS_FULFILLED'
export type FETCH_STATS_FULFILLED = typeof FETCH_STATS_FULFILLED
export const FETCH_STATS_FAILED = 'FETCH_STATS_FAILED'
export type FETCH_STATS_FAILED = typeof FETCH_STATS_FAILED

export interface IStats {
  username: string
  stats: number
}

export interface IStatsState {
  stats: IStats[]
  isLoading: boolean
}

// Action Creators

export const fetchStatsLoading = () => ({
  type: FETCH_STATS_LOADING,
})

export const fetchStatsFulfilled = (payload: IStats[]) => ({
  payload,
  type: FETCH_STATS_FULFILLED,
})

export const fetchStatsFailed = () => ({
  type: FETCH_STATS_FAILED,
})

// Reducer

const initialState: IStatsState = {
  isLoading: false,
  stats: null,
}

export default function CommentStatsReducer(
  state: IStatsState = initialState,
  action: IAction = {},
): IStatsState {
  switch (action.type) {
    case FETCH_STATS_FAILED:
      return { ...state, isLoading: false }
    case FETCH_STATS_FULFILLED:
      return { ...state, isLoading: false, stats: action.payload }
    case FETCH_STATS_LOADING:
      return { ...state, isLoading: true }
    default:
      return state
  }
}

// API

export const getStats = () => async (dispatch: Dispatch = null as any) => {
  dispatch(fetchStatsLoading())
  try {
    await axios({
      headers: { Authorization: `Bearer ${getToken()}` },
      method: 'GET',
      url: `${apiEndpoints.api}/admins/comment_stats`,
    })
      .then(res => {
        dispatch(fetchStatsFulfilled(res.data.stats))
      })
      .catch(error => {
        dispatch(fetchStatsFailed())
      })
  } catch (error) {
    dispatch(fetchStatsFailed())
  }
}
