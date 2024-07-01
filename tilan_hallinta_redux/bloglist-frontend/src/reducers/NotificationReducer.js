import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: null,
  style: null,
  visible: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      state.msg = action.payload.msg
      state.style = action.payload.style
      state.visible = true
    },
    hideNotification(state, action) {
      state.msg = null
      state.style = null
      state.visible = false
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (msg, style, delay) => {
  return async (dispatch) => {
    dispatch(showNotification({ msg, style }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, delay * 1000)
  }
}
