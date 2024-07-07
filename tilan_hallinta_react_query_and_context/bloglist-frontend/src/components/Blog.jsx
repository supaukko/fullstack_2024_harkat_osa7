import { Card, Button, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Comments from './Comments'

const Blog = ({ blogs, user, handleDeleteBlog, handleUpdateBlog }) => {
  const id = useParams().id
  const blog = blogs?.find((item) => item.id === id)

  // console.log(`*** Blog user=${user?.username}`, blog)

  const handleIncreaseLikes = () => {
    const updatedBlog = { ...blog, ['votes']: blog.votes + 1 }
    // console.log('*** handleIncreaseLikes', updatedBlog)
    handleUpdateBlog(updatedBlog)
  }

  if (blog === undefined) {
    return null
  }

  const isRemoveEnabled = blog?.user?.username === user?.username

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
            <strong>author:</strong> {blog.author} <br />
            <strong>url:</strong>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
            <br />
            <strong>vote:</strong> {blog.votes}
          </Card.Text>
          <Row className="justify-content-left">
            <Col xs="auto">
              <Button variant="primary" onClick={handleIncreaseLikes}>
                like
              </Button>
            </Col>
            {isRemoveEnabled && (
              <Col xs="auto">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteBlog(blog)}
                  disabled={!isRemoveEnabled}
                >
                  remove
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
      <Comments blog={blog} />
    </div>
  )
}

Blog.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  handleDeleteBlog: PropTypes.func,
  handleUpdateBlog: PropTypes.func
}

Blog.defaultProps = {
  user: null,
  handleDeleteBlog: undefined,
  handleUpdateBlog: undefined
}
export default Blog
