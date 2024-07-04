import { NotificationContextProvider } from './NotificationContext'
import { VisibilityContextProvider } from './VisibilityContext'
import { FilterContextProvider } from './FilterContext'

export const AppProvider = ({ children }) => {
  return (
    <FilterContextProvider>
      <VisibilityContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </VisibilityContextProvider>
    </FilterContextProvider>
  )
}
