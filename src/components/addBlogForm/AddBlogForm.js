import React, {useState} from 'react'
import {connect} from 'react-redux'
import FileBase from 'react-file-base64'

import {addUserBlog} from '../../redux/blog/blogActions'
import ErrorPage from '../errorPage/ErrorPage'

function AddProductForm({isLoggedIn, addUserBlog}) {

   const [blog, setBlog] = useState({
      title:'',
      tags: '',
      description: '',
      imageFile: ''
   })
   const [error, setError] = useState("")

   const handleChange = (e) => setBlog({...blog, [e.target.name]: e.target.value})

   const handleSubmit = (e) => {
      e.preventDefault()
      setError("")
      if(isValid()) {
         console.log(blog)
         addUserBlog(blog)
      }
      else console.log(blog)

   }

   const isValid = () => {
      const {title, description, imageFile, tags} = blog
      if(title.length < 3 || title.length > 30){
         setError("Title length should be >= 3 and < 30")
         return false
      }
      else if(description.length < 5 || description.length > 500) {
         setError("desciption length should be >= 5 and < 500")
         return false
      }
      else if(imageFile.length === 0 || (imageFile.length > 0 && imageFile.substring(5, 10) !== "image")) {
         setError("Choose proper image")
         return false
      }
      else if(tags.length > 100){
         setError("tags length should be < 100")
         return false
      } 
      else return true
   }

   const displayData = isLoggedIn? 
   (
      
      <div>
         <form className="form_container" onSubmit = {(e) => handleSubmit(e)}>
            <br/>
            <h2>Add Blog</h2><br/>
            {  error.length > 0?
               <div className="alert alert-danger" role="alert">
                  {error}
               </div>: null
            }  
            <div className="form-group">
               <label htmlFor="title">Title </label><br/>
               <input className="form-control" type="text" name="title" id="title" onChange = {(e) => handleChange(e)} value = {blog.title}/><br/>
            </div>
            <div className="form-group">
               <label htmlFor="tags">Tags(seperated by ',')</label><br/>
               <input className="form-control" type="text" name="tags" id="tags" onChange = {(e) => handleChange(e)} value = {blog.tags} /><br/>
            </div>
            <div className="form-group">
               <label htmlFor="description">Description</label><br/>
               <textarea className="form-control" name="description" id="description" onChange = {(e) => handleChange(e)}></textarea><br/>
            </div>
            <div className="form-group">
               <label htmlFor="">Choose an Image File</label><br/>
               <FileBase
                  multiple = {false}
                  onDone = {({base64}) => setBlog({...blog, imageFile: base64})}
               />
               <br/> 
            </div>
            <input className="btn btn-primary" type="submit" value="Add Blog"/>
         </form>
      </div>
   ): (<ErrorPage message="User has to Log In First"/>)

   return (
      <>
         {displayData}
      </>
   )
}

const mapStateToProps = state => ({
   isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, {addUserBlog})(AddProductForm)
