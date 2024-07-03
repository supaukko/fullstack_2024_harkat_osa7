import { useNotificationValue } from '../contexts/NotificationContext';

const Notification = () => {
  const { notification } = useNotificationValue();
  notification
  //console.log('Notification', notification)
  if (notification.message === null || notification.style === null) {
    return null
  }

  return <div className={notification.style}>{notification.message}</div>
}

export default Notification
