import Blog from './Blog'
import Filter from './Filter'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useAddNotification } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'
import { useUpdateBlog, useRemoveBlog } from '../hooks/useBlogs'
import { notificationStyle, parseErrorMsg } from '../utils'
import { Outlet, Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blogs = ({ blogs }) => {
  const addNotification = useAddNotification()
  const { user } = useUserValue()
  const updateBlog = useUpdateBlog()
  const removeBlog = useRemoveBlog()

  const handleUpdateBlog = async (updatedBlog) => {
    // console.log('** handleUpdateBlog', updatedBlog)
    try {
      await updateBlog.mutateAsync({ id: updatedBlog.id, data: updatedBlog })
      addNotification(`Updated ${updatedBlog.author}`, notificationStyle.info)
    } catch (error) {
      addNotification(parseErrorMsg(error), notificationStyle.error)
    }
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
      } catch (error) {
        addNotification(parseErrorMsg(error), notificationStyle.error)
      }
    }
  }

  return (
    <div>
      <h2>Blogit</h2>
      {user && (
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
      )}
      <Outlet />
      <Filter />
      <ul className={'list-no-style'}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdateBlog={handleUpdateBlog}
            user={user}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))}
      </ul>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blogs
