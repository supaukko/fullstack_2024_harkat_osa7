import { useState } from 'react'
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
      <h3>
        {blog.title} -- {blog.author}
      </h3>
      <ul className={'list-no-style'}>
        <li>
          <div className={'row'}>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </div>
        </li>
        <li>
          <div className={'row'}>
            <p className="paragraph" data-testid="blog_votes">
              {blog.votes} likes
            </p>
            <div>
              <button onClick={handleIncreaseLikes}>like</button>
            </div>
          </div>
        </li>
        <li>
          <div className={'row'}>
            <p className="paragraph">added by {blog.user?.name}</p>
          </div>
          {isRemoveEnabled && (
            <button
              className={'blue-button'}
              onClick={() => handleDeleteBlog(blog)}
              disabled={!isRemoveEnabled}
            >
              remove
            </button>
          )}
        </li>
      </ul>
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
