import { useLoginUser, useUserValue } from '../contexts/UserContext'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid
} from '@mui/material'

function Login() {
  const loginUser = useLoginUser()
  const { user } = useUserValue()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    loginUser(event.target.username.value, event.target.password.value)
    navigate('/', { replace: true })
  }

  if (user) {
    console.log('** Login', user)
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return (
    <Grid container spacing={10} justifyContent="left">
      <Grid item xs={14} sm={10} md={8}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2, marginTop: 2 }}>
            <TextField label="username" name="username" type="text" />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField label="password" name="password" type="password" />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            login
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default Login
