import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { useAddNotification } from './contexts/NotificationContext'
import Login from './components/Login'
import UserList from './components/UserList'
import User from './components/User'
import Menu from './components/Menu'
import NotFound from './components/NotFound'
import BlogForm from './components/BlogForm'

import { useFilterValue } from './contexts/FilterContext'
import { useBlogs } from './hooks/useBlogs'
import { useUserValue, useLogoutUser } from './contexts/UserContext'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useUpdateBlog, useRemoveBlog } from './hooks/useBlogs'
import { notificationStyle, parseErrorMsg } from './utils'

const App = () => {
  const { user } = useUserValue()
  const logoutUser = useLogoutUser()
  const { filter } = useFilterValue()
  const { isPending, isError, data: blogs, error } = useBlogs()
  const addNotification = useAddNotification()
  const updateBlog = useUpdateBlog()
  const removeBlog = useRemoveBlog()
  const navigate = useNavigate()

  console.log('App', user)

  const handleUpdateBlog = async (updatedBlog) => {
    // console.log('** handleUpdateBlog', updatedBlog)
    try {
      await updateBlog.mutateAsync({ id: updatedBlog.id, data: updatedBlog })
      addNotification(`Updated ${updatedBlog.author}`, notificationStyle.info)
    } catch (error) {
      addNotification(parseErrorMsg(error), notificationStyle.error)
    }
  }

  const handleLogout = async () => {
    logoutUser()
    navigate('/', { replace: true })
  }

  /**
   * Handle delete
   * @param {*} id
   */
  const handleDeleteBlog = async (deleteBlog) => {
    console.log('handleDeleteBlog', deleteBlog)
    if (
      window.confirm(
        `Remove blog '${deleteBlog.title}' by ${deleteBlog.author}?`
      )
    ) {
      try {
        await removeBlog.mutateAsync(deleteBlog.id)
        addNotification(
          `The blog '${deleteBlog.title}' has been removed`,
          notificationStyle.info
        )
        navigate('/', { replace: true })
      } catch (error) {
        addNotification(parseErrorMsg(error), notificationStyle.error)
      }
    }
  }

  const filteredBlogs = blogs
    ?.filter((blog) =>
      blog.title?.toLocaleLowerCase().includes(filter?.toLocaleLowerCase())
    )
    .sort((blog1, blog2) => blog2.votes - blog1.votes)

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Service not available due to {error.message}</span>
  }

  return (
    <div>
      <Menu user={user} handleLogout={handleLogout} />
      <Notification />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Blogs blogs={filteredBlogs} />} />
        <Route
          path="users"
          element={user ? <UserList /> : <Navigate replace to="/login" />}
        />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/new-blog" element={<BlogForm />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={filteredBlogs}
              user={user}
              handleDeleteBlog={handleDeleteBlog}
              handleUpdateBlog={handleUpdateBlog}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
