import Filter from './Filter'
import { ListGroup } from 'react-bootstrap'
import { useUserValue } from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blogs = ({ blogs }) => {
  const { user } = useUserValue()

  return (
    <div>
      <h2>Blogit</h2>
      {user && (
        <Link to="/blogs/new-blog">
          <button>create new blog</button>
        </Link>
      )}
      <Filter />
      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link className={'row'} to={`/blogs/${blog.id}`}>
              {blog.title} -- {blog.author}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blogs
