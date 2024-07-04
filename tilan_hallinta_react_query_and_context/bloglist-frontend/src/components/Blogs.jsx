import Blog from './Blog'
import { useAddNotification } from '../contexts/NotificationContext'
import { useUpdateBlog, useRemoveBlog } from '../hooks/useBlogs'
import { notificationStyle, parseErrorMsg } from '../utils'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, user }) => {
  const addNotification = useAddNotification()
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
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object
}

Blogs.defaultProps = {
  user: null
}

export default Blogs
