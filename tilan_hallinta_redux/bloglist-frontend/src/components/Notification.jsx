import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.msg === null || notification.style === null) {
    return null
  }

  return <div className={notification.style}>{notification.msg}</div>
}

export default Notification
