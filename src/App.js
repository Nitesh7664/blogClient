import React, {useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import {setToken} from './redux/setToken'
import {loadUser} from './redux/user/userActions'

import Navbar from './components/Navbar/Navbar'
import LoginForm from './components/loginForm/LoginForm'
import Blogs from './components/blogs/Blogs'
import RegisterForm from './components/registerForm/RegisterForm'
import UserBlogs from './components/blogs/UserBlogs'
import AddBlogForm from './components/addBlogForm/AddBlogForm'
import ErrorPage from './components/errorPage/ErrorPage'

import './App.css'
import { map } from 'jquery'

if(localStorage.getItem('auth-token'))
   setToken(localStorage.getItem('auth-token'))

function App({loadUser}) {

   useEffect(() => {
      loadUser()
   }, [loadUser])

   return (
      <div>
         <Navbar />
         <Switch>
            <Route exact path = "/" component = {Blogs}/>
            <Route exact path = "/login" component = {LoginForm}/>
            <Route exact path = "/register" component = {RegisterForm}/>
            <Route exact path = "/user-blogs" component = {UserBlogs} />
            <Route exact path = "/add-blog" component = {AddBlogForm} />
            <Route component = {ErrorPage}/>
         </Switch>
      </div>
   )
}


export default connect(null, {loadUser})(App)
