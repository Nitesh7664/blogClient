import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {loadBlogs} from '../../redux/blog/blogActions'
import Blog from '../blog/Blog' 
import styles from './Blogs.module.css'

function Blogs({blogs, loadBlogs}) {

   useEffect(() => {
      loadBlogs()
   }, [loadBlogs])

   return (
      <div className={styles.blogs_container}>
         {blogs.map((blog, index) => <Blog key = {index} blog = {blog} />)}
      </div>
   )
}

const mapStatetoProps = state => ({
   blogs: state.blog.blogs
})

export default connect(mapStatetoProps, {loadBlogs})(Blogs)