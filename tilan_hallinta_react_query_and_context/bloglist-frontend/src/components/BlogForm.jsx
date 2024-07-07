import { useState } from 'react'
import { useAddNotification } from '../contexts/NotificationContext'
import { useVisibilityDispatch } from '../contexts/VisibilityContext'
import { useCreateBlog } from '../hooks/useBlogs'
import { notificationStyle, parseErrorMsg } from '../utils'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
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
      navigate('/', { replace: true })
    } catch (error) {
      addNotification(parseErrorMsg(error), notificationStyle.error)
    }
  }

  /**
   * Handle the addition of a new blog
   * @param {*} event
   */
  const handleCancel = (event) => {
    navigate('/', { replace: true })
  }

  return (
    <div>
      <h3>{header}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="author">
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            data-testid="author"
            name="author"
            placeholder="Enter author"
            value={blogData.author}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>title</Form.Label>
          <Form.Control
            as="textarea"
            name="title"
            data-testid="title"
            rows={5}
            placeholder="Enter title"
            value={blogData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            data-testid="url"
            name="url"
            placeholder="Enter url"
            value={blogData.url}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="votes">
          <Form.Label>votes</Form.Label>
          <Form.Control
            type="text"
            data-testid="votes"
            name="votes"
            placeholder="Enter votes"
            value={blogData.votes}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <Button
              type="button"
              variant="warning"
              className="ml-2"
              onClick={handleClear}
            >
              clear form
            </Button>
            <Button type="submit" variant="primary">
              create
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="ml-2"
              onClick={handleCancel}
            >
              cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
