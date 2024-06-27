import { Alert } from '@mui/material'
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
    <div>
      <Alert severity="success">{notification}</Alert>
    </div>
  )
}

export default Notification