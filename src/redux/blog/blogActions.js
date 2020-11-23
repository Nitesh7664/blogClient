import axios from 'axios'

import {setToken} from '../setToken'
import {loadUser} from '../user/userActions'
import {LOAD_BLOG, LOAD_BLOG_SUCCESS, LOAD_BLOG_FAILURE, LOAD_USER_BLOG, LOAD_USER_BLOG_SUCCESS, LOAD_USER_BLOG_FAILURE,ADD_USER_BLOG, ADD_USER_BLOG_SUCCESS, ADD_USER_BLOG_FAILURE, DELETE_USER_BLOG, DELETE_USER_BLOG_SUCCESS, DELETE_USER_BLOG_FAILURE} from './blogTypes'
import {BASE_URL} from '../api'

export const loadBlogs = () => async dispatch => {
   dispatch({type: LOAD_BLOG})
   try{
      const responseData = await axios.get(`${BASE_URL}/blogs`)
      dispatch({type: LOAD_BLOG_SUCCESS, payload: responseData.data})
   }catch(err){
      dispatch({type: LOAD_BLOG_FAILURE, payload: err})
   }
}

export const loadUserBlogs = () => async dispatch => {
   dispatch({type: LOAD_USER_BLOG})
   if(localStorage.getItem('auth-token')) setToken(localStorage.getItem('auth-token'))
   try{
      const responseData = await axios.get(`${BASE_URL}/blogs/user`)
      dispatch({type: LOAD_USER_BLOG_SUCCESS, payload: responseData.data})
   }catch(err){
      dispatch({type: LOAD_USER_BLOG_FAILURE, payload: err})
   }
}

export const addUserBlog = (blog) => async dispatch => {
   dispatch({type: ADD_USER_BLOG})
   if(localStorage.getItem('auth-token')) setToken(localStorage.getItem('auth-token'))
   try{
      const responseData = await axios.post(`${BASE_URL}/blogs/add`, blog)
      console.log(responseData.data)
      dispatch({type: ADD_USER_BLOG_SUCCESS, payload: responseData.data})
      dispatch(loadUser())
      dispatch(loadUserBlogs())
      dispatch(loadBlogs())
   }catch(err){
      dispatch({type: ADD_USER_BLOG_FAILURE, payload: err})
   }
}
export const deleteUserBlog = (id) => async dispatch => {
   dispatch({type: DELETE_USER_BLOG})
   if(localStorage.getItem('auth-token')) setToken(localStorage.getItem('auth-token'))
   try{
      const responseData = await axios.delete(`${BASE_URL}/blogs/delete/${id}`)
      console.log(responseData.data)
      dispatch({type: DELETE_USER_BLOG_SUCCESS, payload: responseData.data})
      dispatch(loadBlogs())
      dispatch(loadUser())
   }catch(err){
      dispatch({type: DELETE_USER_BLOG_FAILURE, payload: err})
   }
}