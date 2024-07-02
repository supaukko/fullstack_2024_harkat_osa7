import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from './reducers/userReducer'
import togglableReducer from './reducers/togglableReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    filter: filterReducer,
    blogs: blogsReducer,
    user: userReducer,
    togglable: togglableReducer
  }
})

export default store
