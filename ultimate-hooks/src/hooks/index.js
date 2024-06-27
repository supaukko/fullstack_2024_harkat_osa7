import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) {
        console.log('useResource - error', error.response.data)
      }
    }
    fetchData()
  }, [baseUrl]);

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
    return response.data
  }

  const create = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    setResources([...resources, response.data ])
    return response.data
  }

  const service = {
    create,
    getAll,
    baseUrl
  }

  return [
    resources, service
  ]
}


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
