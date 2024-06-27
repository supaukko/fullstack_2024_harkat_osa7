import { Link } from 'react-router-dom'
import { Page, Navigation } from './styled'

const Menu = () => {

  const padding = {
    paddingRight: 5
  }

  return (
    <Page>
      <Navigation>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </Navigation>
    </Page>
  )
}

export default Menu