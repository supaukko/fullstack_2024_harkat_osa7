import { createContext, useReducer, useContext, useEffect } from 'react'
import loginService from '../services/login'
import { USER_STORAGE_KEY, notificationStyle } from '../utils'
import { useAddNotification } from './NotificationContext'

const loggedUserJSON = window.localStorage.getItem(USER_STORAGE_KEY)
const initialState = {
  user: loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const useUserValue = () => {
  const context = useContext(UserContext)
  return context !== undefined ? context[0] : null
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  return context !== undefined ? context[1] : null
}

export const useLoginUser = () => {
  const context = useContext(UserContext)
  return context !== undefined ? context[2] : null
}

export const useLogoutUser = () => {
  const context = useContext(UserContext)
  return context !== undefined ? context[3] : null
}

export const UserContextProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(userReducer, initialState)
  const addNotification = useAddNotification()

  useEffect(() => {
    if (state.user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user))
      loginService.setToken(state.user.token)
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY)
    }
  }, [state.user])

  const loginUser = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      userDispatch({
        type: 'LOGIN',
        payload: { user: user }
      })
    } catch (error) {
      addNotification('wrong username or password', notificationStyle.error)
    }
  }

  const logoutUser = (user) => {
    loginService.logout()
    userDispatch({
      type: 'LOGOUT',
      payload: { user: null }
    })
  }

  return (
    <UserContext.Provider value={[state, userDispatch, loginUser, logoutUser]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
