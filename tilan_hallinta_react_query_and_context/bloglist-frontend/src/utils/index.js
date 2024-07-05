export const notificationStyle = {
  info: 'info',
  error: 'error'
}

/**
 * Parse error msg
 * @param {*} error
 * @returns
 */
export const parseErrorMsg = (error) => {
  const msg = error.response?.data?.error
  return msg !== null && msg !== undefined && msg.length > 0
    ? msg
    : error.message
}

export const uniqueId = () => {
  const hexa = Date.now().toString(16)
  const nbr = Math.random().toString(16).slice(2)
  return `${hexa}-${nbr}`
}

export const isBlank = (str) => {
  return str === null || str === undefined || str === ''
}

export const USER_STORAGE_KEY = 'loggedBloglistUser"'
