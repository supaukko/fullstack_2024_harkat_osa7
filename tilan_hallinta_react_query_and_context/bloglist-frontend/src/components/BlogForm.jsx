import { useState } from 'react'
import { useAddNotification } from '../contexts/NotificationContext'
import { useVisibilityDispatch } from '../contexts/VisibilityContext'
import { useCreateBlog } from '../hooks/useBlogs'
import { notificationStyle, parseErrorMsg } from '../utils'

const defaultBlogData = {
  author: '',
  title: '',
  url: '',
  votes: 0,
  id: null
}

const BlogForm = () => {
  const createBlog = useCreateBlog()
  const addNotification = useAddNotification()
  const [blogData, setBlogData] = useState({ ...defaultBlogData })
  const blogFormVisibilityDispatch = useVisibilityDispatch()
  const header = 'Add a new blog'
  /**
   * Handle change
   * @param {*} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target
    setBlogData({
      ...blogData,
      [name]: value
    })
  }

  /**
   * Clear blog data
   */
  const handleClear = (event) => {
    event.preventDefault()
    setBlogData({ ...defaultBlogData })
  }

  /**
   * Handle the addition of a new blog
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('handleAddBlog', blogData)
      await createBlog.mutateAsync(blogData)
      blogFormVisibilityDispatch({ type: 'BLOG_FORM_VISIBILITY' })
      addNotification(
        `a new blog ${blogData.title} by ${blogData.author} added`,
        notificationStyle.info
      )
    } catch (error) {
      addNotification(parseErrorMsg(error), notificationStyle.error)
    }
  }

  return (
    <div>
      <h3>{header}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">author:</label>
          <input
            data-testid="author"
            type="text"
            id="author"
            name="author"
            value={blogData.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">title:</label>
          <input
            data-testid="title"
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            data-testid="url"
            type="text"
            id="url"
            name="url"
            value={blogData.url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="votes">likes:</label>
          <input
            data-testid="votes"
            type="text"
            id="votes"
            name="votes"
            value={blogData.votes}
            onChange={handleChange}
          />
        </div>
        <button onClick={(event) => handleClear(event)}>clear form</button>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
