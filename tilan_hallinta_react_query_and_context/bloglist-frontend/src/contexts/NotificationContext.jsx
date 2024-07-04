import { createContext, useReducer, useContext } from 'react'

const initialState = {
  notification: {
    message: null,
    style: null
  }
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
    case 'HIDE':
      return {
        ...state,
        notification: action.payload
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

export function useNotification() {
  return useContext(NotificationContext)
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context !== undefined ? context[0] : null
}

export const useAddNotification = () => {
  const context = useContext(NotificationContext)
  return context !== undefined ? context[2] : null
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )

  const addNotification = (message, style) => {
    console.log('addNotification', message, style)
    notificationDispatch({
      type: 'SHOW',
      payload: { message, style }
    })
    setTimeout(() => {
      notificationDispatch({
        type: 'HIDE',
        payload: { message: null, style: null }
      })
    }, 5000)
  }
  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch, addNotification]}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
