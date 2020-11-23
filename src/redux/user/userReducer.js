import { setToken } from '../setToken'
import { USER_LOGIN, USER_LOGIN_FAILURE, USER_LOGIN_SUCCESS, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, USER_LOGOUT } from './userTypes'

const initialState = {
   isLoading: false,
   token: localStorage.getItem('auth-token'),
   isLoggedIn: false,
   userData: {},
   error: {}
}

const userReducer = (state = initialState, action) => {
   const {type, payload} = action
   switch(type){
      case USER_LOGIN:
      case USER_REGISTER:
      case LOAD_USER:
         return {
            ...state,
            isLoading: true
         }
      case USER_LOGIN_SUCCESS: 
      case USER_REGISTER_SUCCESS: 
         localStorage.setItem('auth-token', payload)
         setToken(payload)
         return {
            ...state,
            isLoading: false,
            token: payload,
            isLoggedIn: true
         } 
      case USER_LOGIN_FAILURE:
      case USER_REGISTER_FAILURE:
         return {
            ...state,
            isLoading: false,
            isLoggedIn: false,
            error: payload
         }
      case LOAD_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            isLoggedIn: true,
            userData: {...payload}
         }
      case LOAD_USER_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: payload
         }
      case USER_LOGOUT:
         setToken('')
         localStorage.setItem('auth-token', '')
         return {
            ...state,
            isLoggedIn: false,
            userData: {},
            error: {}
         }
      default: return state
   }
}

export default userReducer