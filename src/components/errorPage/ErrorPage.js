import React from 'react'

function ErrorPage({message}) {
   return (
      <div className="error_message">
         <h1>{message? message: "404 Error page"}</h1>
      </div>
   )
}

export default ErrorPage
