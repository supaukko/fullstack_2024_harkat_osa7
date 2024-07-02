import Blog from './Blog'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateBlogAndNotify,
  removeBlogAndNotify
} from '../reducers/blogsReducer'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((store) => {
    // console.log('Blogs - useSelector', store)
    if (store.filter !== '') {
      return store.blogs.filter((blog) => blog.title?.includes(store.filter))
    }
    return store.blogs
  })

  if (blogs === undefined) {
    return null
  }

  return (
    <ul className={'list-no-style'}>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlog={() =>
            dispatch(updateBlogAndNotify({ ...blog, votes: blog.votes + 1 }))
          }
          user={user}
          handleDeleteBlog={() => dispatch(removeBlogAndNotify(blog))}
        />
      ))}
    </ul>
  )
}

Blogs.propTypes = {
  user: PropTypes.object
}

Blogs.defaultProps = {
  user: null
}

export default Blogs
