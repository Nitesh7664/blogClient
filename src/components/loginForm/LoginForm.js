import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {loginUser} from '../../redux/user/userActions'

function LoginForm({isLoggedIn, loginUser}) {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')


   const handleSubmit = (e) => {
      e.preventDefault()
      setError("")
      if(isInputsValid()) {
         loginUser({email, password})
      }
   }
   
   const isInputsValid = () => {
      if(email.length < 5 || email.length > 30){
         setError("Email length >= 5 and < 30")
         return false
      }
      else if(password.length < 6 || password.length > 30) {
         setError("Password length >= 6 and < 30")
         return false
      }else 
         return true
   }


   return (
      <div>{!isLoggedIn?
         <form className="form_container" onSubmit = {(e) => handleSubmit(e)}>
            <br/>
            <h2>Login form</h2>
            <br/>
            {  error.length > 0?
               <div className="alert alert-danger" role="alert">
                  {error}
               </div>: null
            } 
            <div className="form-group">
               <label htmlFor="email">Email</label><br/>
               <input className="form-control" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <br/>
            </div>
            <div className="form-group">
               <label htmlFor="password">Password</label><br/>
               <input className="form-control" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
               <br/>
            </div>
            <input className="btn btn-primary" type="submit" value="Login" />
            <Link className="btn btn-success ml-2" to = "/register"> Register</Link>
         </form>  
         : <Redirect to = '/' />}
      </div>
   )
}

const mapStateToProps = state => ({
   isLoggedIn: state.user.isLoggedIn
})


export default connect(mapStateToProps, {loginUser})(LoginForm)
