import { Alert } from 'react-bootstrap'

const Notification = ({notification}) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification === '') {
    return
  }
  return (
    <div className="container">
      <Alert variant="success">{notification}</Alert>
    </div>
  )
}

export default Notification