import { useAddComment } from '../hooks/useBlogs'
import { uniqueId } from '../utils'
import { useAddNotification } from '../contexts/NotificationContext'
import { notificationStyle, parseErrorMsg } from '../utils'

import PropTypes from 'prop-types'

const CommentForm = ({ blog }) => {
  const addComment = useAddComment()
  const addNotification = useAddNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="comment" placeholder="..." />
      <button type="submit">add comment</button>
    </form>
  )
}

CommentForm.propTypes = {
  blog: PropTypes.object.isRequired
}

export default CommentForm
