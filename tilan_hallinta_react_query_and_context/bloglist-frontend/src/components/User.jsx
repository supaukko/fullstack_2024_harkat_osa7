import { useUsers } from '../hooks/useUsers'
import { useParams } from 'react-router-dom'
import { Page, Container, Label, Text, List, ListItem, Button } from './styled'
import { useNavigate } from 'react-router-dom'

const User = () => {
  const { data: users } = useUsers()
  const id = useParams().id
  const user = users?.find((item) => item.id === id)
  const navigate = useNavigate()

  if (user === undefined) {
    return null
  }

  return (
    <Page>
      <Button type="button" onClick={() => navigate(-1)}>
        back to user list
      </Button>
      <Container>
        <Label>User&apos;s name:</Label>
        <Text>{user.name}</Text>
      </Container>
      <Container>
        <Label>added blogs:</Label>
      </Container>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </Page>
  )
}

export default User
