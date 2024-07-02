export const USER_STORAGE_KEY = 'loggedBloglistUser"'

export const sortBlogs = (blogs) => {
  return blogs.sort((blog1, blog2) => blog2.votes - blog1.votes)
}

export const parseErrorMsg = (error) => {
  const msg = error.response?.data?.error
  return msg !== null && msg !== undefined && msg.length > 0
    ? msg
    : error.message
}

export const notificationStyle = {
  info: 'info',
  error: 'error'
}
