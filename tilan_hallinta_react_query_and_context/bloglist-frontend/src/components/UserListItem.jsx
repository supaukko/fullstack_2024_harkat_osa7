function UserListItem({ user }) {
  console.log('UserListItem', user)

  if (user === undefined) {
    return null
  }

  return (
    <>
      <td>{user.name}</td>
      <td>{user.blogs ? user.blogs.length : 0}</td>
    </>
  )
}

export default UserListItem
