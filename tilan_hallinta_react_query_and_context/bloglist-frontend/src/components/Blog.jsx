import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

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

  const isRemoveEnabled = blog?.user?.username !== user?.username

  return (
    <ul className={'list-no-style'}>
      <li className={'blog'}>
        <div className={'row'}>
          <p className="paragraph">
            {blog.title} -- {blog.author}
          </p>
        </div>
        <div className={'row'}>
          <p className="paragraph">url: {blog.url}</p>
        </div>
        <div className={'row'}>
          <p className="paragraph" data-testid="blog_votes">
            likes: {blog.votes}
          </p>
          <div>
            <button onClick={handleIncreaseLikes}>like</button>
          </div>
        </div>
        <div className={'row'}>
          <p className="paragraph">user: {blog.user?.name}</p>
        </div>
        {!isRemoveEnabled && (
          <button
            className={'blue-button'}
            onClick={() => handleDeleteBlog(blog)}
            disabled={isRemoveEnabled}
          >
            remove
          </button>
        )}
      </li>
    </ul>
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
