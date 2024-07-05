import { useParams } from 'react-router-dom'

function UserListItem({ user }) {
  console.log('UserListItem', user)
  const { userId } = useParams()
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
