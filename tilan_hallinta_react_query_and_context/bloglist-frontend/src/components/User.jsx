import { useUsers } from '../hooks/useUsers'
import { useParams } from 'react-router-dom'

const User = () => {
  const { data: users } = useUsers()
  const id = useParams().id
  const user = users?.find((item) => item.id === id)

  if (user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
