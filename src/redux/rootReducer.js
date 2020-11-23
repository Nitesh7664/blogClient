import { combineReducers } from 'redux'

import userReducer from './user/userReducer'
import blogReducer from './blog/blogReducer'

const rootReducer = combineReducers({
   user: userReducer,
   blog: blogReducer
})

export default rootReducer