import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { sortBlogs, parseErrorMsg, notificationStyle } from '../utils'
import { setNotification } from './notificationReducer'

const initialState = []

/**
 * Redux Toolkit hyödyntää createSlice-funktion avulla määritellyissä reducereissa
 * Immer-kirjastoa, joka mahdollistaa state-argumentin mutatoinnin reducerin sisällä.
 * Immer muodostaa mutatoidun tilan perusteella uuden, immutablen tilan ja näin
 * tilamuutosten immutabiliteetti säilyy.
 */
const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      // Mutatoinnin on salittua reducerin sisällä kiitos Immer-toteutuksen
      console.log('addBlog', action.payload)
      state.push(action.payload)
      return sortBlogs(state)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      console.log('updateBlog', changedBlog)
      return sortBlogs(
        state.map((item) => (item.id !== changedBlog.id ? item : changedBlog))
      )
    },
    removeBlog(state, action) {
      const removedBlog = action.payload
      console.log('removeBlog', removedBlog)
      return sortBlogs(state.filter((blog) => blog.id !== removedBlog.id))
    },
    setBlogs(state, action) {
      console.log(`setBlogs - count=${action.payload.length} `)
      return sortBlogs(action.payload)
    }
  }
})

export const { addBlog, updateBlog, setBlogs, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogAndNotify = (data) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(data)
      dispatch(addBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          notificationStyle.info,
          5
        )
      )
    } catch (error) {
      dispatch(
        setNotification(parseErrorMsg(error), notificationStyle.error, 5)
      )
    }
  }
}

export const removeBlogAndNotify = (blog) => {
  return async (dispatch) => {
    console.log('removeBlogAndNotify', blog)
    if (!window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)) {
      return
    }
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog))
      setNotification(
        `the blog '${blog.title}' has been removed`,
        notificationStyle.info,
        5
      )
    } catch (error) {
      setNotification(parseErrorMsg(error), notificationStyle.error, 5)
    }
  }
}

export const updateBlogAndNotify = (blog) => {
  return async (dispatch) => {
    console.log('updateBlogAndNotify', blog)
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      dispatch(updateBlog(updatedBlog))
      setNotification(
        `the blog '${blog.title}' has been updated`,
        notificationStyle.info,
        5
      )
    } catch (error) {
      setNotification(parseErrorMsg(error), notificationStyle.error, 5)
    }
  }
}
