function LoggedInUser({ user, handleLogout }) {
  return (
    <div className="row">
      <p className="paragraph">{user?.name} logged in</p>
      <div>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

export default LoggedInUser
