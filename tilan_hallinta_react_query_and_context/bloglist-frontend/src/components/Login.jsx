import { useState } from 'react'
import PropTypes from 'prop-types'
import { useLoginUser } from '../contexts/UserContext'

function Login() {
  const loginUser = useLoginUser()

  const handleSubmit = async (event) => {
    event.preventDefault()
    loginUser(event.target.username.value, event.target.password.value)
  }

  return (
    <div className="border">
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            data-testid="username"
            id="username"
            name="username"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            data-testid="password"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
