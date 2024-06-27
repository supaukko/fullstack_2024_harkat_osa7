import { useState, useEffect } from 'react'
import axios from 'axios'

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

export const useCountry = (name) => {
  const [data, setData] = useState(null)
  const [countryName, setCountryName] = useState(name);

  useEffect(() => {
    if (countryName) {
      // console.log('useCountry', countryName)
      const fetchData = async () => {
        try {
          const response =
            await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
          setData(response.data);
        } catch (error) {
          console.log('useCountry - error', error.response.data)
          setData(error.response.data)
        }
      };

      fetchData();
    }
  }, [countryName]);


  useEffect(() => {})

  return { data, countryName, setCountryName }
}
