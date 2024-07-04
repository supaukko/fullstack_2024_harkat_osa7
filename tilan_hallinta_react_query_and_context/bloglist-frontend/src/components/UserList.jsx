import UserListItem from './UserListItem'
import { useUsers } from '../hooks/useUsers'

const UserList = () => {
  const { isPending, isError, data: users, error } = useUsers()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Service not available due to {error.message}</span>
  }

  if (users === undefined) {
    return null
  }

  console.log('*** UserList', users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <UserListItem user={user} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
