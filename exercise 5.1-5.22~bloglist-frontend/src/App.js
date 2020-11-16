import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null
        ? <Togglable buttonLabel='login' visible={true}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        :
        <div>
          <Togglable buttonLabel='New Blog' ref={blogRef}>
            <BlogForm
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              visibilityReference={blogRef}
            />
          </Togglable>
          <h2>blogs</h2>
          <p>{user.name} logged-in <button onClick={handleLogout}>LogOut</button></p>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blogData={blog} userData={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App