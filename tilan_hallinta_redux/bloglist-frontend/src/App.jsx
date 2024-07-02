import { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Login from './components/Login'
import User from './components/User'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setLoggerUser, userLogout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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
    dispatch(setLoggerUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(userLogout())
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <User user={user} handleLogout={handleLogout} />
      {!user && <Login />}
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
