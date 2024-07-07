import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
function LoggedInUser({ user, handleLogout }) {
  return (
    <>
      {user ? (
        <>
          <Nav.Item className="nav-link">{user?.name} logged in</Nav.Item>
          <Button variant="outline-danger" onClick={handleLogout}>
            logout
          </Button>
        </>
      ) : (
        <Nav.Link as={Link} to="/login">
          login
        </Nav.Link>
      )}
    </>
  )
}

export default LoggedInUser
