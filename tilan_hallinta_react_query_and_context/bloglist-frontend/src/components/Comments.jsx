import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Comments = ({ blog }) => {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.index}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

Comments.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Comments
