
import { Hash, LocationKey, Pathname, Query, Search} from 'history'
import { browserHistory } from 'react-router'

// ------------------------------------
// Constants & Types
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export type LOCATION_CHANGE = typeof LOCATION_CHANGE
export type Action = "POP" | "PUSH" | "REPLACE";

export interface ILocationState {
  pathname: Pathname;
  search: Search;
  query: Query;
  hash: Hash;
  action: Action;
  key: LocationKey;
}

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location = '/') {
  return {
    payload: location,
    type: LOCATION_CHANGE,
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = browserHistory.getCurrentLocation()

export default function locationReducer(state = initialState, action: any) {
  return action.type === LOCATION_CHANGE ? action.payload : state
}