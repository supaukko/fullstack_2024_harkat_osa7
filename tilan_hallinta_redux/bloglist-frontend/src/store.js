import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    filter: filterReducer,
    blogs: blogsReducer
  }
})

export default store
