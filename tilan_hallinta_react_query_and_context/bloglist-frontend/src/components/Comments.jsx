import CommentForm from './CommentForm'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'

const Comments = ({ blog }) => {
  return (
    <div>
      <h2>Comments</h2>
      <CommentForm blog={blog} />
      <ListGroup>
        {blog.comments.map((comment) => (
          <ListGroup.Item key={comment.index}>{comment.comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

Comments.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Comments
