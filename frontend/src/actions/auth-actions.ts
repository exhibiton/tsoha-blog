import { IUser } from '../types/UserTypes'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS
export const LOGIN_FAIL = 'LOGIN_FAIL'
export type LOGIN_FAIL = typeof LOGIN_FAIL
export const LOGIN_LOADING = 'LOGIN_LOADING'
export type LOGIN_LOADING = typeof LOGIN_LOADING
export const SIGN_UP = 'SIGN_UP'
export type SIGN_UP = typeof SIGN_UP
export const LOGOUT = 'LOGOUT'
export type LOGOUT = typeof LOGOUT
export const FORCE_SET_AUTH_TOKEN = 'FORCE_SET_AUTH_TOKEN'
export type FORCE_SET_AUTH_TOKEN = typeof FORCE_SET_AUTH_TOKEN
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS'
export type ADMIN_LOGIN_SUCCESS = typeof ADMIN_LOGIN_SUCCESS
export const ADMIN_LOGIN_FAIL = 'ADMIN_LOGIN_FAIL'
export type ADMIN_LOGIN_FAIL = typeof ADMIN_LOGIN_FAIL
export const ADMIN_LOGIN_LOADING = 'ADMIN_LOGIN_LOADING'
export type ADMIN_LOGIN_LOADING = typeof ADMIN_LOGIN_LOADING
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT'
export type ADMIN_LOGOUT = typeof ADMIN_LOGOUT

export const loginSuccess = (payload: string | { [key: string]: any }) => ({
  payload,
  type: LOGIN_SUCCESS,
})

export const loginFail = () => ({
  type: LOGIN_FAIL,
})

export const loginLoading = () => ({
  type: LOGIN_LOADING,
})

export const adminLoginSuccess = (payload: string | { [key: string]: any }) => ({
  payload,
  type: ADMIN_LOGIN_SUCCESS,
})

export const adminLoginFail = () => ({
  type: ADMIN_LOGIN_FAIL,
})

export const adminLoginLoading = () => ({
  type: ADMIN_LOGIN_LOADING,
})

export const signUp = (payload: IUser) => ({
  payload,
  type: SIGN_UP,
})

export const onLogout = () => ({
  type: LOGOUT,
})

export const onAdminLogout = () => ({
  type: ADMIN_LOGOUT,
})
