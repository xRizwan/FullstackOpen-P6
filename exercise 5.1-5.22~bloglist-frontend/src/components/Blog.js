import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogData, userData }) => {

  const [ blog, setBlog ] = useState(blogData)
  const [ show, setShow ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShow = () => {
    setShow(show => !show)
  }

  const handleLikes = async () => {
    const obj = {
      user: blog.user.id,
      likes: parseInt(blog.likes) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    try {
      await blogService.update(`${blog.id}`, obj)
      setBlog(blog => ({ ...blog, likes: blog.likes + 1 }))
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemove = async () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      const result = await blogService.delete(blog.id)
      if (result.status === 204) {
        setBlog(null)
      }
    }
  }

  if (blog === null) {
    return (
      <div></div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blogInfo">
        {blog.title} {blog.author}
        <button onClick={handleShow} className="displayer">
          {show ? 'hide' : 'view'}
        </button>
      </div>
      {show
        ? <>
          <div>
            {blog.url}
          </div>
          <div className="likes">
            likes {blog.likes} <button onClick={handleLikes} className="likeButton">Like</button>
          </div>
          <div>
            { blog.user ? blog.user.username : null}
          </div>
          {blog.user.username === userData.username
            ? <button onClick={handleRemove} className="deleteButton">Remove</button>
            : null}
        </>
        : null}
    </div>
  )
}

export default Blog
