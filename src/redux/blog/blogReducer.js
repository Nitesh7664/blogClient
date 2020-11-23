import {LOAD_BLOG, LOAD_BLOG_SUCCESS, LOAD_BLOG_FAILURE, LOAD_USER_BLOG, LOAD_USER_BLOG_SUCCESS, LOAD_USER_BLOG_FAILURE,ADD_USER_BLOG, ADD_USER_BLOG_SUCCESS, ADD_USER_BLOG_FAILURE, DELETE_USER_BLOG, DELETE_USER_BLOG_SUCCESS, DELETE_USER_BLOG_FAILURE} from './blogTypes'

const initialState = {
   isLoading: false,
   blogs: [],
   userBlogs: [],
   error: {}
}

const blogReducer = (state = initialState, action) => {
   switch(action.type){
      case LOAD_BLOG:
         return {
            ...state,
            isLoading: true
         }
      case LOAD_BLOG_SUCCESS:
         return {
            ...state,
            isLoading: false,
            blogs: [...action.payload]
         }
      case LOAD_BLOG_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         }
      case LOAD_USER_BLOG:
         return {
            ...state,
            isLoading: true
         }
      case LOAD_USER_BLOG_SUCCESS: 
         return {
            ...state,
            isLoading: false,
            userBlogs: [...action.payload]
         }
      case LOAD_USER_BLOG_FAILURE: 
         return {
            ...state,
            isLoading: false,
            error: action.payload
         }
      case ADD_USER_BLOG:
      case DELETE_USER_BLOG:
         return {
            ...state,
            isLoading: true
         }
      case ADD_USER_BLOG_SUCCESS:
      case DELETE_USER_BLOG_SUCCESS:
         return {
            ...state,
            isLoading: false
         }
      case ADD_USER_BLOG_FAILURE:
      case DELETE_USER_BLOG_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         }
      default:
         return state
   }
} 

export default blogReducer