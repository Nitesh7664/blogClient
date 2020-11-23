import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import {registerUser} from '../../redux/user/userActions'

function RegisterForm({user, registerUser}) {
   const [state, setState] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
   })
   const [error, setError] = useState('')

   const handleChange = (e) => setState({...state, [e.target.name]: e.target.value})

   const handleSubmit = (e) => {
      setError("")
      e.preventDefault()
      if(isInputValid())
         registerUser(state)
   }

   const isInputValid = () => {
      const {firstName, lastName, email, password} = state
      if(firstName.length < 2 || firstName.length > 30){
         setError("FirstName length >= 2 and < 30")
         return false
      }
      else if(lastName.length < 2 || lastName.length > 30) {
         setError("LastName length >= 2 and < 30")
         return false
      }
      else if(email.length < 5 || email.length > 30) {
         setError("Email length >= 5 and < 30")
         return false
      }
      else if(password.length < 6 || password.length > 30) {
         setError("Password Length >= 6 and < 30")
         return false
      }else
         return true
   }

   return (
      <div>{!user.isLoggedIn?
         <form className="form_container" onSubmit = {(e) => handleSubmit(e)}>
            <br/>
            <h1>Register Form</h1>
            <br/>
            {  error.length > 0?
               <div className="alert alert-danger" role="alert">
                  {error}
               </div>: null
            } 
            <div className="form-group">
               <label htmlFor="firstName">First Name:</label> 
               <br/>
               <input className="form-control" type="text" name="firstName" id="firstName" onChange = {(e) =>handleChange(e)} value = {state.firstName}/> 
               <br/>
            </div>
            <div className="form-group">
               <label htmlFor="lastName">Last Name:</label><br/>
               <input className="form-control" type="text" name="lastName" id="lastName" onChange = {(e) =>handleChange(e)} value = {state.lastName}/><br/>
            </div>
            <div className="form-group">
               <label htmlFor="email">Email:</label>
               <input className="form-control" type="email" name="email" id="email" onChange = {(e) =>handleChange(e)} value = {state.email}/><br/>
            </div>
            <div className="form-group">
               <label htmlFor="password">Password:</label><br/>
               <input className="form-control" type="password" name="password" id="password" onChange = {(e) =>handleChange(e)} value = {state.password}/><br/>
            </div>
            
            <input className="btn btn-primary" type="submit" value="Register"/>
            <Link className="btn btn-success ml-2" to="/login">login</Link>
         </form>
         : <Redirect to = '/' />}
      </div>
   )
}

const mapStateToProps = state => ({
   user: state.user
})

export default connect(mapStateToProps, {registerUser})(RegisterForm)
