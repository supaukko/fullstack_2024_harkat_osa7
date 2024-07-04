import axios from 'axios'
const baseUrl = '/api/login'
import { USER_STORAGE_KEY } from '../utils'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = () => {
  console.log('logout')
}

export default { login, logout }
