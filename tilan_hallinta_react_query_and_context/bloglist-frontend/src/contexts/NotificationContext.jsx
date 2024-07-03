import { createContext, useReducer, useContext } from 'react'

const initialState = {
  notification: {
    message: null,
    style: null
  }
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
    case "HIDE":
      return {
        ...state,
        notification: action.payload
      }
    default:
        return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  if (notificationAndDispatch !== undefined) {
    // console.log('useNotificationValue', notificationAndDispatch)
    return notificationAndDispatch[0];
  }
  return null
}

export function useNotification() {
  return useContext(NotificationContext);
}

export const useAddNotification = () => {
  const addNotification = useContext(NotificationContext)[2]
  return addNotification;
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)
    const addNotification = (message, style) => {
        console.log('addNotification', message, style)
        notificationDispatch({
            type: 'SHOW',
            payload: { message, style}
        });
        setTimeout(() => {
            notificationDispatch({
                type: 'HIDE',
                payload: { message: null, style: null}
            });
        }, 5000);
    }
  
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch, addNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
