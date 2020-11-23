import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {loadUserBlogs, deleteUserBlog} from '../../redux/blog/blogActions'
import UserBlog from '../blog/UserBlog' 
import ErrorPage from '../errorPage/ErrorPage'
import styles from './Blogs.module.css'

function UserBlogs({user, loadUserBlogs, deleteUserBlog}) {

   useEffect(() => {
      loadUserBlogs()
   }, [loadUserBlogs])

   const handleDelete = (id) => {
      const confirmation = window.confirm("Are you Sure you want to DELETE THE blog")
      if(confirmation) deleteUserBlog(id)
   }

   const displayData = user.isLoggedIn? (
      <div className={styles.blogs_container}>
         {user.userData.blogs.length > 0 ? user.userData.blogs.map((blog, index) => <UserBlog key = {index} blog = {blog} handleDelete = {handleDelete}/>): <ErrorPage message="No blog of these user"/>}
      </div>
   ): <ErrorPage message="User Has to LOGIN first" />

   return (
      <>
      {displayData}
      </>
   )

   }


const mapStatetoProps = state => ({
   user: state.user
})

export default connect(mapStatetoProps, {deleteUserBlog, loadUserBlogs})(UserBlogs)