import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { USER_STORAGE_KEY, parseErrorMsg, notificationStyle } from '../utils'
import { setNotification } from './notificationReducer'

const initialState = null

/**
 * Redux Toolkit hyödyntää createSlice-funktion avulla määritellyissä reducereissa
 * Immer-kirjastoa, joka mahdollistaa state-argumentin mutatoinnin reducerin sisällä.
 * Immer muodostaa mutatoidun tilan perusteella uuden, immutablen tilan ja näin
 * tilamuutosten immutabiliteetti säilyy.
 */
const blogsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // Mutatoinnin on salittua reducerin sisällä kiitos Immer-toteutuksen
      console.log('setUser', action.payload)
      return action.payload
    },
    resetUser(state, action) {
      return initialState
    }
  }
})

export const { setUser, resetUser } = blogsSlice.actions
export default blogsSlice.reducer

export const setLoggerUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(USER_STORAGE_KEY)
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON)
      dispatch(setUser(usr))
      console.log('initializeUser', usr)
      blogService.setToken(usr.token)
    }
  }
}

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const usr = await loginService.login({ username, password })
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usr))
      blogService.setToken(usr.token)
      dispatch(setUser(usr))
    } catch (error) {
      dispatch(
        setNotification(
          'wrong username or password',
          notificationStyle.error,
          5
        )
      )
    }
  }
}

export const userLogout = () => {
  return (dispatch) => {
    dispatch(resetUser(null))
    loginService.logout()
  }
}
