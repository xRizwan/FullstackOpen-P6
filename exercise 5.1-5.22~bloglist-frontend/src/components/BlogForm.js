import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setErrorMessage, setBlogs, visibilityReference }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (e) => {
    e.preventDefault()
    visibilityReference.current.toggleVisibility()

    if(title === '' || url === '' || author === ''){
      setErrorMessage('Missing Content')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    let created = await blogService.create({
      title,
      author,
      url,
    })

    setBlogs(blogs => blogs.concat(created))

    setErrorMessage(`A new blog ${title} by ${author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={handleBlog}>
      <h3>Create New Blog</h3>
      <div>
        Title:
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          id="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <button type="submit" id="createButton">Create</button>
    </form>
  )}

export default BlogForm