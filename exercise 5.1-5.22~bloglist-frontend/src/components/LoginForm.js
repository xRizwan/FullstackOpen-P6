import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
            username
          <input
            value={username}
            id="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
            password
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id="loginButton">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired
}

export default LoginForm