import Blog from './Blog'
import Filter from './Filter'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useUserValue } from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blogs = ({ blogs }) => {
  const { user } = useUserValue()

  return (
    <div>
      <h2>Blogit</h2>
      {user && (
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
      )}
      <Filter />
      <ul className={'list-no-style'}>
        {blogs.map((blog) => (
          <li className={'blog'} key={blog.id}>
            <Link className={'row'} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blogs
