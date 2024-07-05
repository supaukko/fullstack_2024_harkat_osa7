import { Link } from 'react-router-dom'
import LoggedInUser from './LoggedInUser'

const Menu = ({ user, handleLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
        {user ? (
          <LoggedInUser user={user} handleLogout={handleLogout} />
        ) : (
          <li>
            <Link to="/login">login</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Menu
