import axios from 'axios'
const baseUrl = '/api/login'
import { USER_STORAGE_KEY } from '../utils'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getConfig = () => {
  console.log('getConfig', token)
  return { headers: { Authorization: token } }
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = () => {
  token = ''
  console.log('logout')
}

export default { login, logout, setToken, getConfig }
