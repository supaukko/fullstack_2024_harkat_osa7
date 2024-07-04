import { NotificationContextProvider } from './NotificationContext'
import { VisibilityContextProvider } from './VisibilityContext'
import { FilterContextProvider } from './FilterContext'
import { UserContextProvider } from './UserContext'
import { BrowserRouter as Router } from 'react-router-dom'

export const AppProvider = ({ children }) => {
  return (
    <Router>
      <NotificationContextProvider>
        <UserContextProvider>
          <FilterContextProvider>
            <VisibilityContextProvider>{children}</VisibilityContextProvider>
          </FilterContextProvider>
        </UserContextProvider>
      </NotificationContextProvider>
    </Router>
  )
}
