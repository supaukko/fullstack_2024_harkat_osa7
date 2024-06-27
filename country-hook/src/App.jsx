import React, { useState } from 'react'
import { useField, useCountry } from './hooks'
import Country from './components/Country'

const App = () => {
  const country = useCountry('')
  const nameInput = useField('text')

  const fetch = (e) => {
    e.preventDefault()
    // console.log('fetch', nameInput.value)
    country.setCountryName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country.data} />
    </div>
  )
}

export default App