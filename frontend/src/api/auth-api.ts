import axios from 'axios'
import jwt from 'jsonwebtoken'
import { browserHistory } from 'react-router'
import { Dispatch } from 'redux'
import toastr from 'toastr'
import {
  adminLoginFail,
  adminLoginLoading,
  adminLoginSuccess,
  loginFail,
  loginLoading,
  loginSuccess,
  onLogout,
} from '../actions/auth-actions'
import apiEndpoints from '../config/apis'
import { ISignInData } from '../types/UserTypes'
import { destroyToken, setAuthorizationToken } from './utils/authorization-token'

export const login = (data: ISignInData) => async (dispatch: Dispatch = null as any) => {
  dispatch(loginLoading())
  return axios({
    method: 'POST',
    params: data,
    url: `${apiEndpoints.api}/users/sign_in`,
  })
    .then(res => {
      const token = res.data.auth_token

      setAuthorizationToken(token)
      const user = jwt.decode(token)

      dispatch(loginSuccess(user))
      browserHistory.push('/')
    })
    .catch(error => {
      toastr.error(error.response.data.errors)
      dispatch(loginFail())
    })
}

export const logout = () => async (dispatch: Dispatch = null as any) => {
  destroyToken()
  dispatch(onLogout())
  browserHistory.push('/')
}

export const adminLogin = (data: ISignInData) => async (dispatch: Dispatch = null as any) => {
  dispatch(adminLoginLoading())
  return axios({
    method: 'POST',
    params: data,
    url: `${apiEndpoints.api}/admins/sign_in`,
  })
    .then(res => {
      const token = res.data.auth_token

      setAuthorizationToken(token)
      const admin = jwt.decode(token)

      dispatch(adminLoginSuccess(admin))
      browserHistory.push('/')
    })
    .catch(error => {
      toastr.error(error.response.data.errors)
      dispatch(adminLoginFail())
    })
}

export const adminLogout = () => async (dispatch: Dispatch = null as any) => {
  destroyToken()
  dispatch(onLogout())
  browserHistory.push('/')
}
