import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Login from './components/Login'
import User from './components/User'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { USER_STORAGE_KEY, notificationStyle } from './utils'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  /**
   * useRef hookilla luodaan ref blogFormRef, joka kiinnitetään muistiinpanojen
   * luomislomakkeen sisältävälle Togglable-komponentille.
   * Nyt siis muuttuja blogFormRef toimii viitteenä komponenttiin
   */
  const blogFormRef = useRef()

  /**
   * Blogilistan lataus
   */
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  /**
   * Tarkistetaan onko kirjautunut käyttäjä
   */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(USER_STORAGE_KEY)
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON)
      setUser(usr)
      console.log('useEffect', usr)
      blogService.setToken(usr.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const usr = await loginService.login({ username, password })
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usr))
      blogService.setToken(usr.token)
      setUser(usr)
    } catch (exception) {
      setNotification('wrong username or password', notificationStyle.error, 5)
    }
  }

  /**
   * Logout
   */
  const handleLogout = () => {
    setUser(null)
    loginService.logout()
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <User user={user} handleLogout={handleLogout} />
      {!user && <Login handleLogin={handleLogin} />}
      <div>
        {user && (
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm user={user} />
          </Togglable>
        )}
        <h2>Blogit</h2>
        <Filter />
        <Blogs user={user} />
      </div>
    </div>
  )
}

export default App
