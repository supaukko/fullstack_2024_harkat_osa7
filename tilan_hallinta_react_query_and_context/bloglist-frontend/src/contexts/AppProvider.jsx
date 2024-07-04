import { NotificationContextProvider } from './NotificationContext'
import { VisibilityContextProvider } from './VisibilityContext'
import { FilterContextProvider } from './FilterContext'
import { UserContextProvider } from './UserContext'

export const AppProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <FilterContextProvider>
        <VisibilityContextProvider>
          <NotificationContextProvider>{children}</NotificationContextProvider>
        </VisibilityContextProvider>
      </FilterContextProvider>
    </UserContextProvider>
  )
}
