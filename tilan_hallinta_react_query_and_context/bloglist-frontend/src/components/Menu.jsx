import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import LoggedInUser from './LoggedInUser'

const Menu = ({ user, handleLogout }) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Blog App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            users
          </Nav.Link>
          <LoggedInUser user={user} handleLogout={handleLogout} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
