import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import UserList from './components/UserList'
import User from './components/User'
import Menu from './components/Menu'
import { useFilterValue } from './contexts/FilterContext'
import { useBlogs } from './hooks/useBlogs'
import { useUserValue, useLogoutUser } from './contexts/UserContext'
import { Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  const { user } = useUserValue()
  const logoutUser = useLogoutUser()
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
      <Menu user={user} handleLogout={logoutUser} />
      <Notification />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Blogs blogs={filteredBlogs} />} />
        <Route
          path="users"
          element={user ? <UserList /> : <Navigate replace to="/login" />}
        />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
