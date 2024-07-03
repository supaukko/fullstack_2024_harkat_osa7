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
import { USER_STORAGE_KEY } from './config/constants'
import { useAddNotification } from './contexts/NotificationContext'
import { useVisibilityDispatch } from './contexts/VisibilityContext';
import { useBlogs, useUpdateBlog, useCreateBlog, useRemoveBlog } from './hooks/useBlogs'


const App = () => {
  const [filter, setFilter] = useState('')
  const [user, setUser] = useState(null)
  const addNotification = useAddNotification()
  const { isPending, isError, data: blogs, error } = useBlogs()
  const createBlog = useCreateBlog()
  const updateBlog = useUpdateBlog()

  /**
   * useRef hookilla luodaan ref blogFormRef, joka kiinnitetään muistiinpanojen
   * luomislomakkeen sisältävälle Togglable-komponentille.
   * Nyt siis muuttuja blogFormRef toimii viitteenä komponenttiin
   */
  //const blogFormRef = useRef()
  const blogFormVisibilityDispatch = useVisibilityDispatch()

  const style = {
    info: 'info',
    error: 'error'
  }

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

  const handleLogin = async (username, password) => {
    try {
      const usr = await loginService.login({ username, password })
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usr))
      blogService.setToken(usr.token)
      setUser(usr)
    } catch (exception) {
      showNotification('wrong username or password', style.error)
    }
  }

  /**
   * Logout
   */
  const handleLogout = () => {
    setUser(null)
    loginService.logout()
  }

  /**
   * Parse error msg
   * @param {*} error
   * @returns
   */
  const parseErrorMsg = (error) => {
    const msg = error.response?.data?.error
    return msg !== null && msg !== undefined && msg.length > 0
      ? msg
      : error.message
  }

  const showNotification = (msg, style) => {
    addNotification(msg, style)
  }

  /**
   * Add a new blog
   */
  const handleAddBlog = async (data) => {
    try {
      console.log('handleAddBlog', data)
      await createBlog.mutateAsync(data)
      blogFormVisibilityDispatch({ type: 'BLOG_FORM_VISIBILITY' });
      showNotification(
        `a new blog ${data.title} by ${data.author} added`,
        style.info
      )
    } catch (error) {
      showNotification(parseErrorMsg(error), style.error)
    }
  }

  /**
   * Update a blog
   */
  const handleUpdateBlog = async (data) => {
    console.log('handleUpdateBlog', data)
    try {
      await updateBlog.mutateAsync({ id: data.id, data })
      showNotification(`Updated ${data.author}`, style.info)
    } catch (error) {
      showNotification(parseErrorMsg(error), style.error)
    }
  }

  /**
   * Handle delete
   * @param {*} id
   */
  const handleDeleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    console.log('handleDeleteBlog', blog)
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((b) => b.id !== id))
        showNotification(
          `The blog '${blog.title}' has been removed`,
          style.info
        )
      } catch (error) {
        showNotification(parseErrorMsg(error), style.error)
      }
    }
  }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Service not available due to {error.message}</span>
  }

  if (filteredBlogs === null) {
    return null
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
            <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
        )}
        <h2>Blogit</h2>
        <Filter filter={filter} handleChange={handleFilterChange} />
        <Blogs
          blogs={filteredBlogs}
          user={user}
          handleDeleteBlog={handleDeleteBlog}
          handleUpdateBlog={handleUpdateBlog}
        />
      </div>
    </div>
  )
}

export default App
