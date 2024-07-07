import { useNotificationValue } from '../contexts/NotificationContext'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const state = useNotificationValue()
  // console.log('Notification', state)
  if (
    state === undefined ||
    state === null ||
    state.notification.message === null ||
    state.notification.style === null
  ) {
    return null
  }

  const variant = state.notification.style === 'info' ? 'success' : 'danger'

  return <Alert variant={variant}>{state.notification.message}</Alert>
}

export default Notification
