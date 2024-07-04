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
