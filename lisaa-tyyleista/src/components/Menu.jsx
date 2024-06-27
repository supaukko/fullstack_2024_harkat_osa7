import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@mui/material'

const Menu = () => {

  const padding = {
    paddingRight: 5
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
          anecdotes
        </Button>
        <Button color="inherit">
          <Link to="/create">create new</Link>
        </Button>
        <Button color="inherit" component={Link} to="/about">
          about
        </Button>  
      </Toolbar>
    </AppBar>
  )
}

export default Menu