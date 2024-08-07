import { useState } from 'react'
import { createBlogAndNotify } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const defaultBlogData = {
  author: '',
  title: '',
  url: '',
  votes: 0,
  id: null
}

const BlogForm = ({ user }) => {
  const dispatch = useDispatch()
  const [blogData, setBlogData] = useState({ ...defaultBlogData })

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
    setBlogData({ ...defaultBlogData })
  }

  /**
   * Create new blog
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(createBlogAndNotify({ ...blogData }))
    setBlogData({ ...defaultBlogData })
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
        <button type="button" onClick={(event) => handleClear(event)}>
          clear form
        </button>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
