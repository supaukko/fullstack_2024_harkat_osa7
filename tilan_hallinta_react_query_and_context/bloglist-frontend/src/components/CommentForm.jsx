import { useAddComment } from '../hooks/useBlogs'
import { uniqueId } from '../utils'
import { useAddNotification } from '../contexts/NotificationContext'
import { notificationStyle, parseErrorMsg, isBlank } from '../utils'
import { Form, Button, Row, Col } from 'react-bootstrap'

import PropTypes from 'prop-types'

const CommentForm = ({ blog }) => {
  const addComment = useAddComment()
  const addNotification = useAddNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (isBlank(comment)) {
      addNotification('Comment is invalid', notificationStyle.error)
    }
    if (comment === null || comment)
      try {
        await addComment.mutateAsync({
          id: blog.id,
          comment: {
            comment: event.target.comment.value,
            index: uniqueId()
          }
        })
        event.target.reset()
      } catch (error) {
        addNotification(parseErrorMsg(error), notificationStyle.error)
      }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="comment">
        <Form.Label>comment</Form.Label>
        <Form.Control
          type="text"
          data-testid="comment"
          name="comment"
          placeholder="Enter comment"
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="primary">
          add comment
        </Button>
      </Form.Group>
    </Form>
  )
}

CommentForm.propTypes = {
  blog: PropTypes.object.isRequired
}

export default CommentForm
