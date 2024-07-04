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
import { useAddNotification } from './contexts/NotificationContext'
import { useFilterValue } from './contexts/FilterContext'
import { useBlogs } from './hooks/useBlogs'
import { useUserValue, useLogoutUser } from './contexts/UserContext'

const App = () => {
  const { user } = useUserValue()
  const logoutUser = useLogoutUser()
  const addNotification = useAddNotification()
  const { filter } = useFilterValue()
  const { isPending, isError, data: blogs, error } = useBlogs()

  console.log('App', user)

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
      <Notification />
      <h2>blogs</h2>
      <User user={user} handleLogout={logoutUser} />
      {!user && <Login />}
      <div>
        {user && (
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
        )}
        <h2>Blogit</h2>
        <Filter />
        <Blogs blogs={filteredBlogs} user={user} />
      </div>
    </div>
  )
}

export default App
