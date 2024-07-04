import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Login from './components/Login'
import User from './components/User'
import Togglable from './components/Togglable'
import { USER_STORAGE_KEY } from './config/constants'
import { useAddNotification } from './contexts/NotificationContext'
import { useBlogs } from './hooks/useBlogs'
import { notificationStyle } from './utils'

const App = () => {
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState(null)
  const addNotification = useAddNotification()
  const { isPending, isError, data: blogs, error } = useBlogs()

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

  console.log('App', user)
  /**
   * Filter
   * @param {*} event
   */
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  /**
   * Filter based on authors. The list is descending sorted
   * according to the likes/votes
   */
  const filteredBlogs = blogs
    ?.filter((blog) =>
      blog.title?.toLocaleLowerCase().includes(filter?.toLocaleLowerCase())
    )
    .sort((blog1, blog2) => blog2.votes - blog1.votes)

  // console.log('**** App', blogs, filteredBlogs)

  const handleLogin = async (username, password) => {
    try {
      const usr = await loginService.login({ username, password })
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usr))
      blogService.setToken(usr.token)
      setUser(usr)
    } catch (exception) {
      addNotification('wrong username or password', notificationStyle.error)
    }
  }

  /**
   * Logout
   */
  const handleLogout = () => {
    setUser(null)
    loginService.logout()
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Service not available due to {error.message}</span>
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <User user={user} handleLogout={handleLogout} />
      {!user && <Login handleLogin={handleLogin} />}
      <div>
        {user && (
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
        )}
        <h2>Blogit</h2>
        <Filter filter={filter} handleChange={handleFilterChange} />
        <Blogs blogs={filteredBlogs} user={user} />
      </div>
    </div>
  )
}

export default App
