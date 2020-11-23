import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {logout} from '../../redux/user/userActions'

function Navbar({isLoggedIn, logout}) {

   const handleLogout = () => logout()

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark dark">
         <div className="container">
         <Link className="navbar-brand bold" to="/">Blog App</Link>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
               <li className="nav-item ml-3">
                <NavLink className="nav-link my-auto" to="/">Blogs</NavLink>
               </li>
               
               {
                  isLoggedIn? (
                     <>
                        <li className="nav-item ml-3">
                        <NavLink className="nav-link" to="/user-blogs">User Blogs</NavLink>
                        </li>
                        <li className="nav-item ml-3">
                        <NavLink className="nav-link" to="/add-blog">Add Blog</NavLink>
                        </li>
                        <button onClick = {handleLogout} className="navbar-btn btn btn-success ml-3">Logout</button>
                     </>
                  ):(
                     <>
                        
                        <li className="nav-item ml-3">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item ml-3">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>
                     </>
                  )
               }
               
            </ul>
         </div>
         </div>
      </nav>
   )
}

const mapStateToProps = state => ({
   isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, {logout})(Navbar)
