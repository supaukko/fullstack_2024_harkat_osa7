import { useNotificationValue } from '../contexts/NotificationContext'

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

  return (
    <div className={state.notification.style}>{state.notification.message}</div>
  )
}

export default Notification
