import { Link } from 'react-router-dom'

function LoggedInUser({ user, handleLogout }) {
  return (
    <>
      {user ? (
        <>
          <li>
            <div>{user?.name} logged in</div>
          </li>
          <li>
            <div>
              <button onClick={handleLogout}>logout</button>
            </div>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">login</Link>
        </li>
      )}
    </>
  )
}

export default LoggedInUser
