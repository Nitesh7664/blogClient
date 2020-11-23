import axios from 'axios'

import { USER_LOGIN, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, USER_LOGOUT } from './userTypes'
import {BASE_URL} from '../api'
import {setToken} from '../setToken'

export const userLoginSuccess = (token) => {
   return {
      type: USER_LOGIN_SUCCESS,
      payload: token
   }
}
export const userLoginFailure = (error) => {
   return {
      type: USER_LOGIN_FAILURE,
      payload: error
   }
}
export const userRegisterSuccess = (data) => {
   return {
      type: USER_REGISTER_SUCCESS,
      payload: data
   }
}
export const userRegisterFailure = (error) => {
   return {
      type: USER_REGISTER_FAILURE,
      payload: error
   }
}
export const userLogout = () => {
   return {
      type: USER_LOGOUT
   }
}

export const loadUser = () => async dispatch => {
   if(localStorage.getItem('auth-token'))
      setToken(localStorage.getItem('auth-token'))

   try{
      dispatch({type: LOAD_USER})
      const responseData = await axios.get(`${BASE_URL}/getUserData`)
      dispatch({type: LOAD_USER_SUCCESS, payload: responseData.data})
   }catch(err){
      dispatch({type: LOAD_USER_FAILURE, payload: err})
   }
}

export const loginUser = ({email, password}) => async dispatch => {
   const reqBody = {email, password}
   try{
      dispatch({type: USER_LOGIN})
      const responseData = await axios.post(`${BASE_URL}/login`, reqBody)
      dispatch(userLoginSuccess(responseData.data.token))
      dispatch(loadUser())
   }catch(err){
      dispatch(userLoginFailure(err))
   }
}
export const registerUser = ({email, password, firstName, lastName}) => async dispatch => {
   const reqBody = {email, password, firstName, lastName}
   try{
      dispatch({type: USER_REGISTER})
      const responseData = await axios.post(`${BASE_URL}/register`, reqBody)
      dispatch(userRegisterSuccess(responseData.data))
      dispatch(loadUser())
   }catch(err){
      dispatch(userRegisterFailure(err))
   }
}

export const logout = () => dispatch => {
   dispatch(userLogout())
}




