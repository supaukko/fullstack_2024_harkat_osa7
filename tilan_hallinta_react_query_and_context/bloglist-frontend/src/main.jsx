import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { VisibilityContextProvider } from './contexts/VisibilityContext'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <VisibilityContextProvider>
        <App />
      </VisibilityContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
