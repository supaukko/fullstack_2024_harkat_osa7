import { createSlice } from '@reduxjs/toolkit'

const toggleableSlice = createSlice({
  name: 'toggleable',
  initialState: { visible: false },
  reducers: {
    setVisibility(state, action) {
      return action.payload
    },
    toggleVisibility(state, action) {
      console.log('toggleVisibility', action, JSON.stringify(state))
      state.visible = !state.visible
    }
  }
})

export const { setVisibility, toggleVisibility } = toggleableSlice.actions
export default toggleableSlice.reducer
