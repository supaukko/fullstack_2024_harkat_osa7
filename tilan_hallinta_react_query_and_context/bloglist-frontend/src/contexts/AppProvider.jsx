import { NotificationContextProvider } from './NotificationContext'
import { VisibilityContextProvider } from './VisibilityContext'
import { FilterContextProvider } from './FilterContext'
import { UserContextProvider } from './UserContext'

export const AppProvider = ({ children }) => {
  return (
    <NotificationContextProvider>
      <UserContextProvider>
        <FilterContextProvider>
          <VisibilityContextProvider>{children}</VisibilityContextProvider>
        </FilterContextProvider>
      </UserContextProvider>
    </NotificationContextProvider>
  )
}
