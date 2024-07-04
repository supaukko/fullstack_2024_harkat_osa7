import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(
    baseUrl,
    newObject,
    loginService.getConfig()
  )
  return response.data
}

const update = async (id, object) => {
  // console.log(`*** update id=${id}`, object)
  const response = await axios.put(
    `${baseUrl}/${id}`,
    object,
    loginService.getConfig()
  )
  return response.data
}

const remove = async (id) => {
  // console.log('*** remove', id)
  await axios.delete(`${baseUrl}/${id}`, loginService.getConfig())
}

export default {
  getAll,
  get,
  create,
  update,
  remove
}
