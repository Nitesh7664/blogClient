import React from 'react'

import styles from './Blog.module.css'

function Blog({blog}) {
   return (
      <div className = {styles.blog_wrapper}>
         {/* <h4>{blog._id}</h4> */}
         <img className={styles.image} src = {blog.imageFile} alt = {blog.title}/>
         <div className={styles.overlay}></div>
         <div className={styles.blog_body}>
            <h1 className={styles.title}>{blog.title}</h1>
            <h6 className={styles.tags}>{blog.tags.map(tag => ('#' + tag + " "))}</h6><br/>
            <p className={styles.description}>{blog.description}</p><br/>
         </div>
      </div>
   )
}

export default Blog
